<script lang="ts">
	export let type: 'success' | 'error' = 'success';

	export let text = '';
</script>

{#if type === 'success'}
	<p class:hidden={!text} class="text-light-success dark:text-dark-success text-center">{text}</p>
{:else if type === 'error'}
	<p class:hidden={!text} class="text-light-error dark:text-dark-error text-center">{text}</p>
{/if}
