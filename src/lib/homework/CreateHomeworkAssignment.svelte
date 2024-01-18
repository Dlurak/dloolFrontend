<script lang="ts">
	import I18n from '$lib/I18n.svelte';
	import { i } from '../../languages/i18n';
	import { subjectsSortetCapitalized } from '../../constants/subjecticons';
	import QuickActionButton from '$lib/QuickActionButton.svelte';
	import DatePicker from '$lib/dates/DatePicker.svelte';
	import { swapArrayElements } from '$lib/utils/SwapItems';
	import type { Assignment } from '../../types/homework';
	import { nextCustomDateForWeekday, nextWeekdayForSubject } from '$lib/timetable';
	import { getCurrentWeekdayAbbreviation } from '$lib/dates/dataWeekday';

	export let assignment: Assignment;
	export let allAssignments: Assignment[];

	let dueWeekday = nextWeekdayForSubject(getCurrentWeekdayAbbreviation(), assignment.subject);
	$: {
		dueWeekday = nextWeekdayForSubject(getCurrentWeekdayAbbreviation(), assignment.subject);
		assignment.due = nextCustomDateForWeekday(dueWeekday);
	}
</script>

<div class="flex flex-col justify-evenly items-center">
	<QuickActionButton
		iconName="bx-up-arrow"
		focusedIconName="bxs-up-arrow"
		on:click={() => {
			const index = allAssignments.indexOf(assignment);
			const newIndex = index - 1;

			allAssignments = swapArrayElements(allAssignments, index, newIndex);
		}}
		disabled={allAssignments.indexOf(assignment) === 0}
	/>
	<QuickActionButton
		iconName="bx-down-arrow"
		focusedIconName="bxs-down-arrow"
		on:click={() => {
			const index = allAssignments.indexOf(assignment);
			const newIndex = index + 1;

			allAssignments = swapArrayElements(allAssignments, index, newIndex);
		}}
		disabled={allAssignments.indexOf(assignment) === allAssignments.length - 1}
	/>
</div>
<div class="w-full">
	<span class="flex flex-row items-center justify-start gap-2 my-2">
		<div class="flex flex-row w-full gap-2">
			<I18n>
				<input
					type="text"
					bind:value={assignment.subject}
					placeholder={i('homework.add.subject')}
					class="w-full outline-1 outline-gray-400 outline rounded-sm p-1"
					list="subjects"
				/>
			</I18n>
			<datalist id="subjects">
				{#each subjectsSortetCapitalized as subj}
					<option value={subj} />
				{/each}
			</datalist>
			<span class="min-w-max outline-1 outline-gray-400 outline rounded-sm p-1">
				<DatePicker bind:dateObj={assignment.due} />
			</span>
		</div>
	</span>
	<I18n>
		<textarea
			bind:value={assignment.description}
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
