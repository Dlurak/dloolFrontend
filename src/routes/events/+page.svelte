<script lang="ts">
	import { calendarEvents, currentLanguage, title } from '../stores';
	import CalendarDay from '$lib/calendar/CalendarDay.svelte';
	import CalendarEvent from '$lib/calendar/CalendarEvent.svelte';
	import { getWeekdays } from '$lib/dates/dataWeekday';
	import I18n from '$lib/I18n.svelte';
	import type { IntRange } from '../../types/utils';
	import { i } from '../../languages/i18n';

	title.set('events');

	const date = new Date();

	let month = date.getMonth() as IntRange<0, 12>;
	let humanMonth = (month + 1) as IntRange<1, 13>;
	let year = date.getFullYear();

	let daysInMonth = new Date(year, humanMonth, 0).getDate();
	let firstDay = new Date(year, month, 1);

	let firstDayWeekday = firstDay.getDay();

	let weekdays = getWeekdays();

	/**
	 * Generates the amount of days to pad the calendar with under the condition that the month starts with a monday like in germany
	 * @param weekdayIndex The index of the first day of the month (0 = sunday, 1 = monday, ...)
	 */
	const generatePaddingDays = (weekdayIndex: number): number => {
		if (weekdayIndex === 0) return 6;
		return weekdayIndex - 1;
	};
	let paddingDays = Array(generatePaddingDays(firstDayWeekday));
	let lastDayPrevMonth = new Date(year, month, 0).getDate();

	let events = $calendarEvents;

	const eventsForDay = (day: number, month: number, year: number) => {
		if (!events) return [];
		return events.filter((event) => {
			const yearMatches = event.date.year === year;
			const monthMatches = event.date.month === month;
			const dayMatches = event.date.day === day;

			return yearMatches && monthMatches && dayMatches;
		});
	};

	const update = () => {
		daysInMonth = new Date(year, humanMonth, 0).getDate();
		firstDay = new Date(year, month, 1);
		firstDayWeekday = firstDay.getDay();
		paddingDays = Array(generatePaddingDays(firstDayWeekday));
		humanMonth = (month + 1) as IntRange<1, 13>;
	};

	const prevMonth = () => {
		if (month === 0) {
			year--;
			month = 11;
		} else {
			month--;
		}
		update();
	};
	const nextMonth = () => {
		if (month === 11) {
			year++;
			month = 0;
		} else {
			month++;
		}
		update();
	};

	calendarEvents.subscribe((value) => {
		events = value;
	});
	currentLanguage.subscribe((value) => {
		weekdays = getWeekdays();
	});
</script>

<div class="flex justify-between items-center mb-4">
	<I18n>
		<button
			on:click={prevMonth}
			title={i('date.month.previous')}
			class="p-3 rounded-sm aspect-square bg-gray-200 hover:bg-gray-300 focus:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-600 dark:focus:bg-gray-600 flex items-center justify-center transition-colors duration-300 ease-in-out"
		>
			<i class="bx bx-chevron-left" />
		</button>
	</I18n>
	{#key humanMonth}
		<h2><I18n key="date.month.{humanMonth}" /> {year}</h2>
	{/key}
	<I18n>
		<button
			on:click={nextMonth}
			title={i('date.month.next')}
			class="p-3 rounded-sm aspect-square bg-gray-200 hover:bg-gray-300 focus:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-600 dark:focus:bg-gray-600 flex items-center justify-center transition-colors duration-300 ease-in-out"
		>
			<i class="bx bx-chevron-right" />
		</button>
	</I18n>
</div>
<div class="grid grid-cols-7">
	{#each weekdays as weekday}
		<p class="capitalize">{weekday}</p>
	{/each}
	{#each paddingDays as _, i}
		<div>
			{#key events}
				<CalendarDay
					day={lastDayPrevMonth - paddingDays.length + i + 1}
					{month}
					{year}
					events={eventsForDay(lastDayPrevMonth - paddingDays.length + i + 1, month, year)}
					secondary
				/>
			{/key}
		</div>
	{/each}

	{#each Array(daysInMonth) as _, i}
		{#key events}
			<CalendarDay day={i + 1} {month} {year} events={eventsForDay(i + 1, month + 1, year)} />
		{/key}
	{/each}
</div>
