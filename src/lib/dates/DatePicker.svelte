<script lang="ts">
	import { createDate } from '$lib/dates/createDateObject';
	import DateLabel from './dateLabel.svelte';
	import type { CustomDate } from '../../types/customDate';
	import Modal from '$lib/Modal.svelte';
	import {
		getAmountOfPaddingDays,
		getMonthLength,
		getPrevMonth,
		getNextMonth
	} from '$lib/calendar/utils';
	import I18n from '$lib/I18n.svelte';
	import type { IntRange } from '../../types/utils';
	import { createEventDispatcher } from 'svelte';

	const currentDate = new Date();

	export let dateObj: CustomDate = createDate(currentDate);

	let isPicking = false;

	let { month, year } = dateObj;

	let displayMonth = month as IntRange<1, 12>;
	let displayYear = year;

	const getDisplayObj = (day = 1) => ({
		day,
		month: displayMonth,
		year: displayYear
	});

	const dispatch = createEventDispatcher();
</script>

<button on:click={() => (isPicking = !isPicking)} type="button">
	<DateLabel date={dateObj} />
</button>

<Modal bind:open={isPicking}>
	<div class="flex flex-col gap-2">
		<div class="flex justify-between">
			<button
				on:click={() =>
					({ year: displayYear, month: displayMonth } = getPrevMonth(getDisplayObj()))}
				type="button"
				class="bx bx-chevron-left"
			/>
			<span>
				{#key displayMonth}
					<I18n
						key="date.month.{displayMonth}"
						options={{
							transform: 'capitalize'
						}}
					/>
				{/key}
				{displayYear}
			</span>
			<button
				on:click={() =>
					({ year: displayYear, month: displayMonth } = getNextMonth(getDisplayObj()))}
				type="button"
				class="bx bx-chevron-right"
			/>
		</div>
		<div class="grid grid-cols-7 gap-0.5">
			{#key [displayMonth, displayYear]}
				{#each { length: getAmountOfPaddingDays(getDisplayObj()) } as _}
					<div />
				{/each}
				{#each { length: getMonthLength(getDisplayObj()) } as _, i}
					<button
						type="button"
						on:click={() => {
							dateObj = getDisplayObj(i + 1);
							isPicking = false;
							dispatch('input', dateObj);
						}}
						class={JSON.stringify(getDisplayObj(i + 1)) === JSON.stringify(dateObj)
							? 'rounded-full bg-light-secondary dark:bg-dark-secondary p-1'
							: 'p-1'}
					>
						{i + 1}
					</button>
				{/each}
			{/key}
		</div>
	</div>
</Modal>
