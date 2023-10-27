<script lang="ts">
	import { dateIsInPast } from '$lib/dates/dateIsInPast';
	import DateLabel from '$lib/dates/dateLabel.svelte';
	import { getIconForSubject, iconExistsForSubject } from '../../constants/subjecticons';
	import { subjectColors } from '../../routes/stores';
	import type { Assignment } from '../../types/homework';

	export let assignment: Assignment;

	let isOverdue = dateIsInPast(assignment.due);
	let color = $subjectColors[assignment.subject.toLowerCase()] || '';

	subjectColors.subscribe((colors) => {
		color = colors[assignment.subject.toLowerCase()] || '';
	});

	$: isOverdue = dateIsInPast(assignment.due);
	$: color = $subjectColors[assignment.subject.toLowerCase()] || '';
</script>

<div class="w-full flex flex-row gap-2" class:opacity-50={isOverdue}>
	{#if color}
		<div style="--c: {color}" class="inline-block bg-[var(--c)] w-1 rounded-full" />
	{/if}
	<div>
		<span class="flex flex-row items-baseline justify-start gap-2 my-2">
			{#if iconExistsForSubject(assignment.subject.toLowerCase())}
				<i class="bx {getIconForSubject(assignment.subject.toLowerCase())}" />
			{/if}
			<h4>{assignment.subject}</h4>
			<DateLabel date={assignment.due} />
		</span>
		<p class="my-2 whitespace-pre-line">{assignment.description}</p>
	</div>
</div>
<div class="hidden print:flex items-start">
	<div class="w-4 h-4 rounded-md border border-solid border-gray-400" />
</div>
