<script lang="ts">
	import DatePicker from '../dates/DatePicker.svelte';

	import { page } from '$app/stores';
	import { PUBLIC_API_URL } from '$env/static/public';
	import SubmitButton from '$lib/SubmitButton.svelte';
	import { i } from '@inlang/sdk-js';
	import { createDate } from '$lib/dates/createDateObject';
	import Box from './Box.svelte';
	import type { CustomDate } from '../../types/customDate';
	import type { Assignment } from '../../types/homework';
	import CreateHomeworkInner from './CreateHomeworkInner.svelte';

	export let postSubmit: (e: Event) => void = () => {
		return;
	};

	const currentDate = new Date();
	let date = createDate(currentDate);

	let assignedAtDateObj: CustomDate;

	let assignments: Assignment[] = [
		{
			subject: '',
			description: '',
			due: date
		}
	];

	let submitButtonDisabled = false;
	$: {
		const allFilled = assignments.every((assignment) => {
			return assignment.subject && assignment.description;
		});
		submitButtonDisabled = !allFilled;
	}
</script>

<Box hideOnPrint>
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

			fetch(PUBLIC_API_URL + '/homework', {
				method: 'POST',
				headers: new Headers({
					authorization: `Bearer ${localStorage.getItem('token')}`,
					'content-type': 'application/json'
				}),
				body: JSON.stringify(bodyObj)
			}).then((res) => res.json());

			assignments = [
				{
					subject: '',
					description: '',
					due: date
				}
			];

			postSubmit(e);
		}}
	>
		<h3 class="mb-4">
			<DatePicker bind:dateObj={assignedAtDateObj} />
		</h3>
		<CreateHomeworkInner bind:assignments />
		<SubmitButton value={i('homework.add.submit')} disabled={submitButtonDisabled} />
	</form>
</Box>
