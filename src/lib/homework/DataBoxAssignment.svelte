<script lang="ts">
	import { rgbToHex } from '$lib/colors/hexToRgb';
	import SvelteMarkdown from 'svelte-markdown';
	import { dateIsInPast } from '$lib/dates/dateIsInPast';
	import DateLabel from '$lib/dates/dateLabel.svelte';
	import { getIconForSubject, iconExistsForSubject } from '../../constants/subjecticons';
	import { subjectColors } from '../../stores';
	import type { Assignment } from '../../types/homework';
	import Loader from '$lib/Loader.svelte';
	import { translate } from '$lib/translate/index';
	import { SvocalKeys } from '../../enums/svocal';
	import { localstorage } from 'svocal';
	import { get } from 'svelte/store';

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

	const homeworkOpacityValue = localstorage(SvocalKeys.PREFRENCES_HOMEWORK_OPACITY, 0.5);

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

{#if !(isOverdue && !$homeworkOpacityValue)}
	<li>
		<div
			class="w-full flex flex-row gap-2 opacity-[var(--opac)]"
			style:--opac={isOverdue ? $homeworkOpacityValue : 100}
		>
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
				{#if get(localstorage(SvocalKeys.LIBRETRANSLATE_ENABLE, false))}
					{#await translate(assignment.description)}
						<span class="flex gap-1">
							<Loader type="inline" />
							<SvelteMarkdown source={assignment.description} />
						</span>
					{:then d}
						<SvelteMarkdown source={d} />
					{:catch}
						<SvelteMarkdown source={assignment.description} />
					{/await}
				{:else}
					<SvelteMarkdown source={assignment.description} />
				{/if}
			</div>
		</div>
		<div class="hidden print:flex items-start">
			<div class="w-4 h-4 rounded-md border border-solid border-gray-400" />
		</div>
	</li>
{/if}
