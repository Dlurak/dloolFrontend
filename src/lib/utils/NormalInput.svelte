<script lang="ts">
	export let value = '';
	export let placeholder = '';
	export let list = '';

	export let type: 'text' | 'textarea' = 'text';
</script>

{#if type === 'text'}
	<input
		type="text"
		bind:value
		{placeholder}
		{list}
		class="w-full bg-transparent rounded-sm outline outline-1 outline-light-secondary dark:outline-dark-secondary"
	/>
{:else if type === 'textarea'}
	<textarea
		bind:value
		{placeholder}
		class="w-full bg-transparent rounded-sm outline outline-1 outline-light-secondary dark:outline-dark-secondary"
	/>
{/if}
