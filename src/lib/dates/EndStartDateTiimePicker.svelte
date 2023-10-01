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
