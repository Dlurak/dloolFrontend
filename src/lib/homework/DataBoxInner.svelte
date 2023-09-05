<script lang="ts">
	import { PUBLIC_API_URL } from '$env/static/public';
	import SubmitButton from '$lib/SubmitButton.svelte';
	import type { CustomDate } from '../../types/customDate';
	import type { Assignment } from '../../types/homework';
	import DatePicker from '../dates/DatePicker.svelte';
	import DateLabel from '../dates/dateLabel.svelte';

	export let date: CustomDate;
	export let assignments: Assignment[];
	export let id: string;
	export let editMode = false;

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
	<div class="flex justify-between items-center">
		<h3>
			{#if editMode}
				<DatePicker bind:dateObj={newDate} />
			{:else}
				<DateLabel {date} />
			{/if}
		</h3>
	</div>
	<ul class="list-none p-0">
		{#if editMode}
			{#each newAssignments as assignment}
				<li class="flex flex-row">
					<div class="w-full">
						<span class="flex flex-row items-center justify-start gap-2 my-2">
							<div class="flex flex-row w-full gap-2">
								<input
									type="text"
									bind:value={assignment.subject}
									class="w-full outline-1 outline-gray-400 outline rounded-sm p-1"
								/>
								<span class="min-w-max outline-1 outline-gray-400 outline rounded-sm p-1">
									<DatePicker bind:dateObj={assignment.due} />
								</span>
							</div>
						</span>
						<input
							type="text"
							bind:value={assignment.description}
							class="w-full outline-1 outline-gray-400 outline rounded-sm p-1"
						/>
					</div>
				</li>
			{/each}
		{:else}
			{#each assignments as assignment}
				<li class="flex flex-row">
					<div class="w-full">
						<span class="flex flex-row items-center justify-start gap-2 my-2">
							<h4>{assignment.subject}</h4>
							<DateLabel date={assignment.due} />
						</span>
						<p class="my-2">{assignment.description}</p>
					</div>
					<div class="hidden print:flex items-start">
						<div class="w-4 h-4 rounded-md border border-solid border-gray-400" />
					</div>
				</li>
			{/each}
		{/if}
	</ul>
	{#if editMode}
		<div class="flex flex-row gap-2">
			<SubmitButton
				value="-"
				colour="red"
				disabled={newAssignments.length === 1}
				onClick={() => {
					newAssignments = newAssignments.slice(0, newAssignments.length - 1);
				}}
			/>
			<SubmitButton
				value="+"
				colour="yellow"
				disabled={newAssignments.at(-1)?.subject === '' ||
					newAssignments.at(-1)?.description === ''}
				onClick={() => {
					newAssignments = [
						...newAssignments,
						{
							subject: '',
							description: '',
							due: newDate
						}
					];
				}}
			/>
		</div>
		<SubmitButton
			value="Update"
			{disabled}
			onClick={() => {
				editMode = false;
				const url = `${PUBLIC_API_URL}/homework/${id}`;
				fetch(url, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('token')}`
					},
					body: JSON.stringify({
						from: newDate,
						assignments: newAssignments
					})
				}).then(() => postUpdate());
			}}
		/>
	{/if}
</div>

<style>
	input {
		color: var(--text);
		background-color: transparent;
	}
	input:focus-visible {
		outline: 2px solid var(--accent);
	}
</style>
