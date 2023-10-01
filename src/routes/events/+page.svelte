<script lang="ts">
	import type { CustomDate } from '../../types/customDate';
	import { calendarEvents } from '../stores';

	const date = new Date();

	const month = date.getMonth();
	const year = date.getFullYear();

	const daysInMonth = new Date(year, month + 1, 0).getDate();
	const firstDay = new Date(year, month, 1);

	const firstDayWeekday = firstDay.getDay();

	const weekdays = [
		'Montag',
		'Dienstag',
		'Mittwoch',
		'Donnerstag',
		'Freitag',
		'Samstag',
		'Sonntag'
	];

	/**
	 * Generates the amount of days to pad the calendar with under the condition that the month starts with a monday like in germany
	 * @param weekdayIndex The index of the first day of the month (0 = sunday, 1 = monday, ...)
	 */
	const generatePaddingDays = (weekdayIndex: number): number => {
		if (weekdayIndex === 0) return 6;
		return weekdayIndex - 1;
	};

	const events = $calendarEvents;

	const eventsForDay = (day: number) => {
		if (!events) return [];
		return events.filter((event) => {
			const eventDate: CustomDate = {
				year: event.date.year,
				month: event.date.month,
				day: event.date.day
			};
			const searchDate: CustomDate = {
				year,
				month: month + 1,
				day
			};
			return JSON.stringify(eventDate) === JSON.stringify(searchDate);
		});
	};
</script>

<svelte:head>
	<title>Dlool | Events</title>
</svelte:head>

<div class="grid grid-cols-7">
	{#each weekdays as weekday}
		<p>{weekday}</p>
	{/each}
	{#each Array(generatePaddingDays(firstDayWeekday)) as _, i}
		<div />
	{/each}

	{#each Array(daysInMonth) as _, i}
		<div class="border border-1 border-gray-600 dark:border-gray-300 p-2">
			{i + 1}
			{#each eventsForDay(i + 1) as event}
				<div class="rounded-sm bg-light-box dark:bg-dark-box px-2 py-1">
					<h4 class="line-clamp-1">{event.title}</h4>
					<p class="line-clamp-3 whitespace-pre-line">{event.description}</p>
				</div>
			{/each}
		</div>
	{/each}
</div>
