<script lang="ts">
	import type { Token } from '../languages/i18n';
	import I18n from './I18n.svelte';

	export let type: 'success' | 'error' = 'success';

	export let text: Token | undefined = undefined;

	const successClasses = 'text-light-success dark:text-dark-success';
	const errorClasses = 'text-light-error dark:text-dark-error';
	const colorClasses = type === 'success' ? successClasses : errorClasses;
</script>

{#key text}
	<p class:hidden={!text} class="{colorClasses} text-center">
		<I18n key={text} />
	</p>
{/key}
