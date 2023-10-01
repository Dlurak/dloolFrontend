<script lang="ts">
	import type { Event } from '../../types/events';
	import CalendarEvent from './CalendarEvent.svelte';

	export let day: number;
	export let month: number;
	export let year: number;
	export let events: Event[] = [];

	const focusedBg = 'bg-light-primary dark:bg-dark-primary';
	const unfocusedBg = 'bg-light-box dark:bg-dark-box';

	const isToday = (day: number, month: number, year: number): boolean => {
		const today = new Date();
		const todayDay = today.getDate();
		const todayMonth = today.getMonth();
		const todayYear = today.getFullYear();

		return day === todayDay && month === todayMonth && year === todayYear;
	};
</script>

<div
	class="border border-1 border-gray-600 dark:border-gray-300 p-2 aspect-square overflow-y-scroll"
>
	<div
		class="rounded-full p-1 flex items-center justify-center w-6 h-6 mb-1 {isToday(day, month, year)
			? focusedBg
			: unfocusedBg}"
	>
		{day}
	</div>

	<div class="flex flex-col gap-1">
		{#each events as event}
			<CalendarEvent {event} />
		{/each}
	</div>
</div>
