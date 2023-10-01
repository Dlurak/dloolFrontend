<!-- <script lang="ts">
	import type { CustomDateTime } from '../../types/customDate';
	import { createDateTime } from './createDateObject';
	import { getDateTimeInInputFormat } from './getDateInInputFormat';

	export let dateString: string = getDateTimeInInputFormat(new Date());
	export let date: Date = new Date(dateString);
	export let dateObj: CustomDateTime = createDateTime(date);
	export let timestamp: number = date.getTime();

	const updateProperties = () => {
		date = new Date(dateString + 'Z');
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
<p>{dateString}Z</p>
<p>{new Date(dateString + 'Z')}</p>
<p>{date}</p> -->

<script lang="ts">
	let startString = '';
	export let startDate: Date = new Date();

	let endString = '';
	export let endDate: Date = new Date();
</script>

<input
	type="datetime-local"
	bind:value={startString}
	on:change={() => (startDate = new Date(startString + 'Z'))}
/>

<input
	type="datetime-local"
	min={startString}
	bind:value={endString}
	on:change={() => (endDate = new Date(endDate + 'Z'))}
/>
