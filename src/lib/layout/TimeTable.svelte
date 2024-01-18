<script lang="ts">
	import { getLocalstorage, setLocalstorage } from '$lib/localstorage';
	import { onMount } from 'svelte';
	import { timetable } from '../../stores';
	import { type TimeTable, emptyTimeTable } from '../../constants/weekDays';

	let readFromLocalstorage = false;

	timetable.subscribe((v) => {
		if (readFromLocalstorage) setLocalstorage('timetable', v);
	});

	onMount(() => {
		const locRes = getLocalstorage<TimeTable>('timetable', emptyTimeTable);
		timetable.set(locRes);
		readFromLocalstorage = true;
	});
</script>
