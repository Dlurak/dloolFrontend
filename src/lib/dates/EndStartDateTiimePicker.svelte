<script lang="ts">
	import { i } from '@inlang/sdk-js';

	let startString = '';
	export let startDate: Date = new Date();

	let endString = '';
	export let endDate: Date = new Date();

	export let endDateIsAfterStartDate = false;

	$: endDateIsAfterStartDate = startDate.getTime() < endDate.getTime();
</script>

<div class="grid gap-4 @md:grid-cols-2 grid-cols-1">
	<div class="flex gap-2 items-center w-full">
		<span class="flex gap-1 items-center">
			<i class="bx bxs-hourglass-top" />
			<p>{i('events.create.time.start')}</p>
		</span>
		<input
			type="datetime-local"
			class="bg-transparent rounded-sm outline outline-1 outline-light-secondary dark:outline-dark-secondary w-full"
			bind:value={startString}
			on:change={() => (startDate = new Date(startString + 'Z'))}
		/>
	</div>

	<div class="flex gap-2 items-center w-full">
		<span class="flex gap-1 items-center">
			<i class="bx bxs-hourglass-bottom" />
			<p>{i('events.create.time.end')}</p>
		</span>
		<input
			type="datetime-local"
			class="bg-transparent rounded-sm outline outline-1 outline-light-secondary dark:outline-dark-secondary w-full"
			min={startString}
			bind:value={endString}
			on:change={() => (endDate = new Date(endString + 'Z'))}
		/>
	</div>
</div>
