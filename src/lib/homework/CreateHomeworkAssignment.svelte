<script lang="ts">
	import I18n from '$lib/I18n.svelte';
	import { i } from '../../languages/i18n';
	import { subjectsSortetCapitalized } from '../../constants/subjecticons';
	import QuickActionButton from '$lib/QuickActionButton.svelte';
	import DatePicker from '$lib/dates/DatePicker.svelte';
	import { swapArrayElements } from '$lib/utils/SwapItems';
	import type { Assignment } from '../../types/homework';
	import { nextCustomDateForWeekday, nextWeekdayForSubject } from '$lib/timetable';
	import { getWeekdayAbbreviationByDate } from '$lib/dates/dataWeekday';
	import { settings, timetable } from '../../stores';
	import type { CustomDate } from '../../types/customDate';
	import type { WeekDay } from '../../constants/weekDays';

	// export let assignment: Assignment;
	export let subject: string;
	export let description: string;
	export let due: CustomDate;
	export let allAssignments: Assignment[];
	export let fromDate: CustomDate;

	let fromAbbr: WeekDay = getWeekdayAbbreviationByDate(fromDate);
	let dueWeekday = nextWeekdayForSubject(fromAbbr, subject);

	let inputModified = false;
	const inputModifiedFalse = () => (inputModified = false);

	$: {
		fromAbbr;
		inputModifiedFalse();
	}

	$: {
		fromAbbr = getWeekdayAbbreviationByDate(fromDate);
		dueWeekday = nextWeekdayForSubject(fromAbbr, subject);

		if (!inputModified) {
			due = nextCustomDateForWeekday(dueWeekday, fromDate);
		} else {
			inputModifiedFalse();
		}
	}

	let autocompleteSubjects = $settings.useTimeTableForAutcomplete
		? $timetable[fromAbbr]
		: subjectsSortetCapitalized;

	$: {
		autocompleteSubjects = $settings.useTimeTableForAutcomplete
			? $timetable[fromAbbr]
			: subjectsSortetCapitalized;
	}

	const generateFullAssignment: () => Assignment = () => ({ subject, description, due });
</script>

<div class="flex flex-col justify-evenly items-center">
	<QuickActionButton
		iconName="bx-up-arrow"
		focusedIconName="bxs-up-arrow"
		on:click={() => {
			const index = allAssignments.indexOf(generateFullAssignment());
			const newIndex = index - 1;

			allAssignments = swapArrayElements(allAssignments, index, newIndex);
		}}
		disabled={allAssignments.indexOf(generateFullAssignment()) === 0}
	/>
	<QuickActionButton
		iconName="bx-down-arrow"
		focusedIconName="bxs-down-arrow"
		on:click={() => {
			const index = allAssignments.indexOf(generateFullAssignment());
			const newIndex = index + 1;

			allAssignments = swapArrayElements(allAssignments, index, newIndex);
		}}
		disabled={allAssignments.indexOf(generateFullAssignment()) === allAssignments.length - 1}
	/>
</div>

<div class="w-full">
	<span class="flex flex-row items-center justify-start gap-2 my-2">
		<div class="flex flex-row w-full gap-2">
			<I18n>
				<input
					type="text"
					bind:value={subject}
					placeholder={i('homework.add.subject')}
					class="w-full outline-1 outline-gray-400 outline rounded-sm p-1"
					list={`subjects-${fromAbbr}`}
				/>
			</I18n>
			<datalist id={`subjects-${fromAbbr}`}>
				{#each autocompleteSubjects as subj}
					<option value={subj} />
				{/each}
			</datalist>
			<span class="min-w-max outline-1 outline-gray-400 outline rounded-sm p-1">
				<DatePicker
					bind:dateObj={due}
					on:input={() => {
						inputModified = true;
					}}
				/>
			</span>
		</div>
	</span>
	<I18n>
		<textarea
			bind:value={description}
			placeholder={i('homework.add.description')}
			class="w-full outline-1 outline-gray-400 outline rounded-sm p-1"
			rows="2"
		/>
	</I18n>
</div>

<style>
	input,
	textarea {
		color: var(--text);
		background-color: transparent;
	}
	:is(input, textarea):focus-visible {
		outline: 2px solid var(--accent);
	}
</style>
