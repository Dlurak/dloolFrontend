<script lang="ts">
	import { i } from '@inlang/sdk-js';
	import { calendarEvents } from '../stores';
	import CalendarDay from '$lib/calendar/CalendarDay.svelte';
	import CalendarEvent from '$lib/calendar/CalendarEvent.svelte';

	const date = new Date();

	let month = date.getMonth();
	let year = date.getFullYear();

	let daysInMonth = new Date(year, month + 1, 0).getDate();
	let firstDay = new Date(year, month, 1);

	let firstDayWeekday = firstDay.getDay();

	const weekdays = [
		i('date.monday'),
		i('date.tuesday'),
		i('date.wednesday'),
		i('date.thursday'),
		i('date.friday'),
		i('date.saturday'),
		i('date.sunday')
	];

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
		daysInMonth = new Date(year, month + 1, 0).getDate();
		firstDay = new Date(year, month, 1);
		firstDayWeekday = firstDay.getDay();
		paddingDays = Array(generatePaddingDays(firstDayWeekday));
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
</script>

<svelte:head>
	<title>Dlool | Events</title>
</svelte:head>

<div class="flex justify-between items-center mb-4">
	<button
		on:click={prevMonth}
		title={i('date.month.previous')}
		class="p-3 rounded-sm aspect-square bg-gray-200 hover:bg-gray-300 focus:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-600 dark:focus:bg-gray-600 flex items-center justify-center transition-colors duration-300 ease-in-out"
	>
		<i class="bx bx-chevron-left" />
	</button>
	<h2>{i('date.month.' + (month + 1))} {year}</h2>
	<button
		on:click={nextMonth}
		title={i('date.month.next')}
		class="p-3 rounded-sm aspect-square bg-gray-200 hover:bg-gray-300 focus:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-600 dark:focus:bg-gray-600 flex items-center justify-center transition-colors duration-300 ease-in-out"
	>
		<i class="bx bx-chevron-right" />
	</button>
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
