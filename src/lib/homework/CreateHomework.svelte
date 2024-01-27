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
		on:submit={(e) => {
			e.preventDefault();

			const mappedAssignments = assignments.map((assignment) => {
				return {
					subject: assignment.subject.trim(),
					description: assignment.description.trim(),
					due: assignment.due
				};
			});
			const bodyObj = {
				from: assignedAtDateObj,
				className: $page.url.searchParams.get('class'),
				assignments: mappedAssignments
			};

			fetch($backendUrl + '/homework', {
				method: 'POST',
				headers: new Headers({
					authorization: `Bearer ${localStorage.getItem('token')}`,
					'content-type': 'application/json'
				}),
				body: JSON.stringify(bodyObj)
			})
				.then((res) => {
					if (res.ok) {
						assignments = [
							{
								subject: '',
								description: '',
								due: createDate(getOneWeekFromNow())
							}
						];

						addToast({
							content: 'toast.homework.add.success',
							type: 'success',
							duration: 5000
						});

						postSubmit(e);
					} else throw new Error();
				})
				.catch(() => {
					addToast({
						content: 'toast.homework.add.error',
						type: 'error',
						duration: 5000
					});
				});
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
