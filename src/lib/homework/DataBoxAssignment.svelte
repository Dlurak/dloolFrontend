<script lang="ts">
	import { rgbToHex } from '$lib/colors/hexToRgb';
	import SvelteMarkdown from 'svelte-markdown';
	import { dateIsInPast } from '$lib/dates/dateIsInPast';
	import DateLabel from '$lib/dates/dateLabel.svelte';
	import { getIconForSubject, iconExistsForSubject } from '../../constants/subjecticons';
	import { subjectColors } from '../../stores';
	import type { Assignment } from '../../types/homework';
	import { localstorage } from 'svocal';
	import { SvocalKeys } from '../../enums/svocal';
	import { translate } from '$lib/translate/index';
	import Loader from '$lib/Loader.svelte';

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

	let libretranslateUrl = localstorage(
		SvocalKeys.LIBRETRANSLATE_URL,
		'https://libretranslate.com/'
	);
	let libretranslateToken = localstorage(SvocalKeys.LIBRETRANSLATE_TOKEN, '');
	let useLibreTranslate = localstorage(SvocalKeys.LIBRETRANSLATE_ENABLE, false);

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
		{#if $useLibreTranslate}
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
