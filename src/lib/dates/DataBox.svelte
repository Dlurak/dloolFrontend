<script lang="ts">
	import SubmitButton from '$lib/SubmitButton.svelte';
	import type { CustomDate } from '../../types/customDate';
	import type { Assignment } from '../../types/homework';
	import Box from '../homework/Box.svelte';
	import DatePicker from './DatePicker.svelte';
	import DateLabel from './dateLabel.svelte';

	export let date: CustomDate;
	export let assignments: Assignment[];

	let editButtonIsFocused = false;

	let editMode = false;

	$: console.log(assignments);
</script>

<Box>
	<div class="flex justify-between items-center">
		<h3>
			{#if editMode}
				<DatePicker />
			{:else}
				<DateLabel {date} />
			{/if}
		</h3>
		<button
			class="print:hidden p-3 bx bx{editButtonIsFocused ? 's' : ''}-edit"
			on:focus={() => {
				editButtonIsFocused = true;
			}}
			on:blur={() => {
				editButtonIsFocused = false;
			}}
			on:click={() => {
				editMode = !editMode;
			}}
		/>
	</div>

	<ul class="list-none p-0">
		{#each assignments as assignment}
			<li class="flex flex-row">
				<div class="w-full">
					<span class="flex flex-row items-center justify-start gap-2 my-2">
						{#if editMode}
							<div class="flex flex-row w-full gap-2">
								<input type="text" bind:value={assignment.subject} class="w-full" />
								<span class="min-w-max outline-1 outline-gray-400 outline rounded-sm p-1">
									<DatePicker bind:dateObj={assignment.due} />
								</span>
							</div>
						{:else}
							<h4>{assignment.subject}</h4>
							<DateLabel date={assignment.due} />
						{/if}
					</span>

					{#if editMode}
						<input type="text" bind:value={assignment.description} class="w-full" />
					{:else}
						<p class="my-2">{assignment.description}</p>
					{/if}
				</div>
				<div class="hidden print:flex items-start">
					<div class="w-4 h-4 rounded-md border border-solid border-gray-400" />
				</div>
			</li>
		{/each}
	</ul>

	{#if editMode}
		<SubmitButton value="Update" />
	{/if}
</Box>

<style>
	input {
		color: var(--text);
		background-color: transparent;
		border: none;
		border-radius: 0.25rem;
		padding: 0.125rem;
		outline: 1px solid gray;
	}
	input:focus-visible {
		outline: 2px solid var(--accent);
	}
</style>
