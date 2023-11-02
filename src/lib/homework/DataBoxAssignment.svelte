<script lang="ts">
	import { rgbToHex } from '$lib/colors/hexToRgb';
	import { dateIsInPast } from '$lib/dates/dateIsInPast';
	import DateLabel from '$lib/dates/dateLabel.svelte';
	import { getIconForSubject, iconExistsForSubject } from '../../constants/subjecticons';
	import { subjectColors } from '../../stores';
	import type { Assignment } from '../../types/homework';

	export let assignment: Assignment;

	let isOverdue = dateIsInPast(assignment.due);
	let subjColor = $subjectColors.filter(
		(v) => v.subject.toLowerCase() === assignment.subject.toLowerCase()
	);
	let colorHex =
		subjColor.length > 0
			? rgbToHex(subjColor[0].color.r, subjColor[0].color.g, subjColor[0].color.b)
			: '';

	subjectColors.subscribe((colors) => {
		subjColor = colors.filter((v) => v.subject.toLowerCase() === assignment.subject.toLowerCase());
		colorHex =
			subjColor.length > 0
				? rgbToHex(subjColor[0].color.r, subjColor[0].color.g, subjColor[0].color.b)
				: '';
	});

	$: isOverdue = dateIsInPast(assignment.due);
	$: {
		subjColor = $subjectColors.filter(
			(v) => v.subject.toLowerCase() === assignment.subject.toLowerCase()
		);
		colorHex =
			subjColor.length > 0
				? rgbToHex(subjColor[0].color.r, subjColor[0].color.g, subjColor[0].color.b)
				: '';
	}
</script>

<div class="w-full flex flex-row gap-2" class:opacity-50={isOverdue}>
	{#if colorHex}
		<div class="py-2 w-1">
			<div style="--color: {colorHex}" class="bg-[var(--color)] h-full w-full rounded-full" />
		</div>
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
