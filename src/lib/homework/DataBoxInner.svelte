<script lang="ts">
	import { PUBLIC_API_URL } from '$env/static/public';
	import SubmitButton from '$lib/SubmitButton.svelte';
	import TimeAgo from '$lib/dates/TimeAgo.svelte';
	import type { CustomDate } from '../../types/customDate';
	import type { Assignment } from '../../types/homework';
	import DatePicker from '../dates/DatePicker.svelte';
	import DateLabel from '../dates/dateLabel.svelte';
	import CreateHomeworkInner from './CreateHomeworkInner.svelte';

	export let date: CustomDate;
	export let assignments: Assignment[];
	export let id: string;
	export let editMode = false;
	export let createdAt: number;

	export let postUpdate: () => void = () => {
		return;
	};

	// EDIT MODE THINGS //

	let newDate = date;
	let newAssignments: Assignment[] = assignments;
	let disabled = false;

	$: {
		const allFilled = newAssignments.every((assignment) => {
			return assignment.subject && assignment.description;
		});
		disabled = !allFilled;
	}
</script>

<div class="w-full">
	<div class="flex flex-col">
		<h3>
			{#if editMode}
				<DatePicker bind:dateObj={newDate} />
			{:else}
				<DateLabel {date} />
			{/if}
		</h3>
		<TimeAgo classes="text-xs" timestamp={createdAt} />
	</div>
	<ul class="list-none p-0">
		{#if editMode}
			<CreateHomeworkInner bind:assignments={newAssignments} />
		{:else}
			{#each assignments as assignment}
				<li class="flex flex-row">
					<div class="w-full">
						<span class="flex flex-row items-baseline justify-start gap-2 my-2">
							<h4>{assignment.subject}</h4>
							<DateLabel date={assignment.due} />
						</span>
						<p class="my-2 whitespace-pre-line">{assignment.description}</p>
					</div>
					<div class="hidden print:flex items-start">
						<div class="w-4 h-4 rounded-md border border-solid border-gray-400" />
					</div>
				</li>
			{/each}
		{/if}
	</ul>
	{#if editMode}
		<SubmitButton
			value="Update"
			{disabled}
			onClick={() => {
				editMode = false;
				const url = `${PUBLIC_API_URL}/homework/${id}`;

				const mappedAssignments = newAssignments.map((assignment) => {
					return {
						subject: assignment.subject.trim(),
						description: assignment.description.trim(),
						due: assignment.due
					};
				});

				fetch(url, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('token')}`
					},
					body: JSON.stringify({
						from: newDate,
						assignments: mappedAssignments
					})
				}).then(() => postUpdate());
			}}
		/>
	{/if}
</div>
