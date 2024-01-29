<script lang="ts">
	import type { Assignment } from '../../types/homework';
	import SubmitButton from '$lib/SubmitButton.svelte';
	import CreateHomeworkAssignment from './CreateHomeworkAssignment.svelte';
	import type { CustomDate } from '../../types/customDate';

	export let date: CustomDate;

	export let canUseTimetable = true;

	const emptyAssignment: Assignment = {
		subject: '',
		description: '',
		due: date
	};

	export let assignments: Assignment[] = [emptyAssignment];
</script>

<ul class="list-none">
	{#each assignments as assignment}
		<li class="flex flex-row">
			<CreateHomeworkAssignment
				bind:subject={assignment.subject}
				bind:description={assignment.description}
				bind:due={assignment.due}
				bind:allAssignments={assignments}
				{canUseTimetable}
				fromDate={date}
			/>
		</li>
	{/each}
</ul>
<div class="flex flex-row gap-2">
	<SubmitButton
		value="-"
		colour="red"
		disabled={assignments.length === 1}
		onClick={(e) => {
			e.preventDefault();
			assignments = assignments.slice(0, assignments.length - 1);
		}}
	/>
	<SubmitButton
		value="+"
		disabled={assignments.at(-1)?.subject.trim() === '' ||
			assignments.at(-1)?.description.trim() === ''}
		colour="yellow"
		onClick={(e) => {
			e.preventDefault();
			assignments = [...assignments, emptyAssignment];
		}}
	/>
</div>
