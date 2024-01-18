<script lang="ts">
	import { createDate } from '$lib/dates/createDateObject';
	import type { Assignment } from '../../types/homework';
	import SubmitButton from '$lib/SubmitButton.svelte';
	import { getOneWeekFromNow } from '../../constants/generateDates';
	import CreateHomeworkAssignment from './CreateHomeworkAssignment.svelte';

	let date = createDate(getOneWeekFromNow());

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
			<CreateHomeworkAssignment bind:assignment bind:allAssignments={assignments} />
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
