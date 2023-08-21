<script lang="ts">
	import type { CustomDate } from '../../types/customDate';
	import type { Assignment } from '../../types/homework';
	import Box from '../homework/Box.svelte';
	import DateLabel from './dateLabel.svelte';

	export let date: CustomDate;
	export let assignments: Assignment[];

	let editButtonIsFocused = false;
</script>

<Box>
	<div class="flex justify-between items-center">
		<h3><DateLabel {date} /></h3>
		<button
			class="p-3 bx bx{editButtonIsFocused ? 's' : ''}-edit"
			on:focus={() => {
				editButtonIsFocused = true;
			}}
			on:blur={() => {
				editButtonIsFocused = false;
			}}
		/>
	</div>

	<ul class="list-none p-0">
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
	</ul>
</Box>
