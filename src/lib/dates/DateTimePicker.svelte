<script lang="ts">
	import type { CustomDateTime } from '../../types/customDate';
	import { createDateTime } from './createDateObject';
	import { getDateTimeInInputFormat } from './getDateInInputFormat';

	export let dateString: string = getDateTimeInInputFormat(new Date());
	export let date: Date = new Date(dateString);
	export let dateObj: CustomDateTime = createDateTime(date);
	export let timestamp: number = date.getTime();

	const updateProperties = () => {
		date = new Date(dateString);
		dateObj = createDateTime(date);
		timestamp = date.getTime();
	};

	$: dateString = getDateTimeInInputFormat(date);
</script>

<input
	type="datetime-local"
	bind:value={dateString}
	on:input={updateProperties}
	class="w-full rounded-sm text-light-text dark:text-dark-text bg-transparent"
/>
