<script lang="ts">
	import I18n from '$lib/I18n.svelte';
	import { getWeekdayByDate } from '$lib/dates/dataWeekday';
	import type { CustomDate } from '../../types/customDate';

	export let date: CustomDate;
	export let short = false;
</script>

<p class="capitalize">
	<I18n>
		{getWeekdayByDate(date, short)}
	</I18n>
	{date.day}.{date.month}.{date.year}
</p>
