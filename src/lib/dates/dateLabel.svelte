<script lang="ts">
	import { getWeekdayByDate } from '$lib/dates/dataWeekday';
	import type { CustomDate } from '../../types/customDate';

	export let date: CustomDate;
</script>

<p class="capitalize">
	{getWeekdayByDate(date)}
	{date.day}.{date.month}.{date.year}
</p>
