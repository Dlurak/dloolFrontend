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

	// Keyboard shortcuts
	let lastPressedKeys: number[] = [];

	const setDate = (day: number) => {
		dateObj = getDisplayObj(day);
		isPicking = false;
		lastPressedKeys = [];
		dispatch('input', dateObj);
	};
	const displayPrevMonth = () =>
		({ year: displayYear, month: displayMonth } = getPrevMonth(getDisplayObj()));
	const displayNextMonth = () =>
		({ year: displayYear, month: displayMonth } = getNextMonth(getDisplayObj()));
</script>

<svelte:window
	on:keydown={(e) => {
		if (!isPicking) return;
		if (e.repeat) return;

		if (e.key === 'h' || e.key === 'ArrowLeft') {
			displayPrevMonth();
			return;
		} else if (e.key === 'l' || e.key === 'ArrowRight') {
			displayNextMonth();
			return;
		} else if (/^\d$/.test(e.key)) {
			lastPressedKeys.push(parseInt(e.key));
			if (lastPressedKeys.length < 2) return;

			const currentNumber = lastPressedKeys[0] * 10 + lastPressedKeys[1];

			const isTooBig = currentNumber > getMonthLength(getDisplayObj());
			const isTooSmall = currentNumber === 0;
			if (isTooBig || isTooSmall) {
				lastPressedKeys = [];
				return;
			}

			setDate(currentNumber);
		}
	}}
/>

<button on:click={() => (isPicking = !isPicking)} type="button">
	<DateLabel date={dateObj} short />
</button>

<Modal bind:open={isPicking}>
	<div class="flex flex-col gap-2">
		<div class="flex justify-between">
			<button on:click={displayPrevMonth} type="button" class="bx bx-chevron-left" />
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
			<button on:click={displayNextMonth} type="button" class="bx bx-chevron-right" />
		</div>
		<div class="grid grid-cols-7 gap-0.5">
			<span> <I18n key="date.monday.short" /> </span>
			<span> <I18n key="date.tuesday.short" /> </span>
			<span> <I18n key="date.wednesday.short" /> </span>
			<span> <I18n key="date.thursday.short" /> </span>
			<span> <I18n key="date.friday.short" /> </span>
			<span> <I18n key="date.saturday.short" /> </span>
			<span> <I18n key="date.sunday.short" /> </span>

			{#key [displayMonth, displayYear]}
				{#each { length: getAmountOfPaddingDays(getDisplayObj()) } as _}
					<div />
				{/each}
				{#each { length: getMonthLength(getDisplayObj()) } as _, i}
					<button
						type="button"
						on:click={() => {
							setDate(i + 1);
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
