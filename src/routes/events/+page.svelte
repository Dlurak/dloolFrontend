<script>
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
</script>

<svelte:head>
	<title>Dlool | Events</title>
</svelte:head>

<div class="grid grid-cols-7">
	{#each weekdays as weekday}
		<p>{weekday}</p>
	{/each}

	{#each Array(firstDayWeekday - 1) as _, i}
		<div />
	{/each}

	{#each Array(daysInMonth) as _, i}
		<div class="border border-1 border-gray-600 dark:border-gray-300 p-2">
			{i + 1}
			<div class="line-clamp-1 rounded-sm bg-light-box dark:bg-dark-box px-2 py-1 empty:hidden" />
		</div>
	{/each}
</div>
