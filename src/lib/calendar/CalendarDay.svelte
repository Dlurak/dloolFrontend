<script lang="ts">
	import type { Event } from '../../types/events';

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

<div class="border border-1 border-gray-600 dark:border-gray-300 p-2">
	<div
		class="rounded-full p-1 flex items-center justify-center w-6 h-6 mb-1 {isToday(day, month, year)
			? focusedBg
			: unfocusedBg}"
	>
		{day}
	</div>

	{#each events as event}
		<div class="rounded-sm bg-light-box dark:bg-dark-box px-2 py-1">
			<h4 class="line-clamp-1">{event.title}</h4>
			<p class="line-clamp-3 whitespace-pre-line">{event.description}</p>
		</div>
	{/each}
</div>
