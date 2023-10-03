<script lang="ts">
	import type { Token } from '../languages/i18n';
	import I18n from './I18n.svelte';

	export let type: 'success' | 'error' = 'success';

	export let text: Token | undefined = undefined;
</script>

{#if type === 'success'}
	<p class:hidden={!text} class="text-light-success dark:text-dark-success text-center">
		<I18n key={text} />
	</p>
{:else if type === 'error'}
	<p class:hidden={!text} class="text-light-error dark:text-dark-error text-center">
		<I18n key={text} />
	</p>
{/if}
