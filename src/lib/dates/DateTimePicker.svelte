<script lang="ts">
	import type { CustomDateTime } from '../../types/customDate';
	import { createDateTime } from './createDateObject';
	import { getDateTimeInInputFormat } from './getDateInInputFormat';

	export let dateString: string = getDateTimeInInputFormat(new Date());
	export let date: Date = new Date(dateString);
	export let dateObj: CustomDateTime = createDateTime(date);

	$: {
		dateString = getDateTimeInInputFormat(date);
		date = new Date(dateString);
		dateObj = createDateTime(date);
	}
</script>

<input
	type="datetime-local"
	bind:value={dateString}
	class="w-full rounded-sm text-light-text dark:text-dark-text bg-transparent"
/>
