<script lang="ts">
	import QuickActionButton from '$lib/QuickActionButton.svelte';
	import DatePicker from '$lib/dates/DatePicker.svelte';
	import { createDate } from '$lib/dates/createDateObject';
	import { swapArrayElements } from '$lib/utils/SwapItems';
	import type { Assignment } from '../../types/homework';
	import SubmitButton from '$lib/SubmitButton.svelte';
	import I18n from '$lib/I18n.svelte';
	import { i } from '../../languages/i18n';
	import { subjectsSortetCapitalized } from '../../constants/subjecticons';
	import { getOneWeekFromNow } from '../../constants/generateDates';

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
			<div class="flex flex-col justify-evenly items-center">
				<QuickActionButton
					iconName="bx-up-arrow"
					focusedIconName="bxs-up-arrow"
					on:click={() => {
						const index = assignments.indexOf(assignment);
						const newIndex = index - 1;

						assignments = swapArrayElements(assignments, index, newIndex);
					}}
					disabled={assignments.indexOf(assignment) === 0}
				/>
				<QuickActionButton
					iconName="bx-down-arrow"
					focusedIconName="bxs-down-arrow"
					on:click={() => {
						const index = assignments.indexOf(assignment);
						const newIndex = index + 1;

						assignments = swapArrayElements(assignments, index, newIndex);
					}}
					disabled={assignments.indexOf(assignment) === assignments.length - 1}
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
