<script lang="ts">
	import DatePicker from '../dates/DatePicker.svelte';
	import { page } from '$app/stores';
	import SubmitButton from '$lib/SubmitButton.svelte';
	import { createDate } from '$lib/dates/createDateObject';
	import Box from './Box.svelte';
	import type { Assignment } from '../../types/homework';
	import CreateHomeworkInner from './CreateHomeworkInner.svelte';
	import I18n from '$lib/I18n.svelte';
	import { i } from '../../languages/i18n';
	import { addToast } from '$lib/toast/addToast';
	import { network } from '../../stores';
	import { backendUrl, backendHasResponse } from '$lib/../stores';
	import { getOneWeekFromNow } from '../../constants/generateDates';
	import { createHomework } from './createHomework';
	import { Status } from '../../enums/status';

	export let postSubmit: (e: Event) => void = () => {
		return;
	};

	let assignedAtDateObj = createDate(new Date());

	let assignments: Assignment[] = [
		{
			subject: '',
			description: '',
			due: createDate(getOneWeekFromNow())
		}
	];

	let submitButtonDisabled = false;
	$: {
		const allFilled = assignments.every((assignment) => {
			return assignment.subject && assignment.description;
		});
		const isOnline = $network === 'online' && $backendHasResponse;
		submitButtonDisabled = !allFilled || !isOnline;
	}
</script>

<Box hideOnPrint fullHeight>
	<form
		on:submit={async (e) => {
			e.preventDefault();
			const className = $page.url.searchParams.get('class');
			if (!className) {
				addToast({
					content: 'toast.homework.add.error',
					type: 'error',
					duration: 5000
				});

				return;
			}

			const status = await createHomework({
				className,
				assignements: assignments,
				assignedAt: assignedAtDateObj
			});

			if (status === Status.SUCCESS) {
				assignments = [
					{
						subject: '',
						description: '',
						due: createDate(getOneWeekFromNow())
					}
				];

				postSubmit(e);
			}
		}}
	>
		<h3 class="mb-4">
			<DatePicker bind:dateObj={assignedAtDateObj} />
		</h3>
		<CreateHomeworkInner bind:assignments bind:date={assignedAtDateObj} />
		<I18n>
			<SubmitButton value={i('homework.add.submit')} disabled={submitButtonDisabled} />
		</I18n>
	</form>
</Box>
