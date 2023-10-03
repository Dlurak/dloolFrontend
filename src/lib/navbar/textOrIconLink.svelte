<script lang="ts">
	import I18n from '$lib/I18n.svelte';
	import type { Token } from '../../languages/i18n';

	export let show = true;

	export let uri: string;
	export let boxIcon: string;
	export let title: Token;
</script>

{#if show}
	<a
		href={uri}
		{title}
		class="w-full h-full flex gap-2 capitalize items-center p-3 relative justify-center text-center box-border cursor-pointer no-underline dark:text-dark-text text-light-text textOrIconLink"
	>
		<I18n key={title} />
		{#if boxIcon}
			<i class="bx {boxIcon}" />
		{/if}
	</a>
{/if}

<style>
	a::after {
		content: '';
		position: absolute;

		bottom: 0;
		left: 0;

		height: 2px;

		width: 0;

		background-color: var(--text);

		transition-property: width;
		transition-timing-function: var(--transition-timing-function);
		transition-duration: var(--transition-timing);
	}

	a:is(:focus, :hover, :active)::after {
		width: 100%;
	}
</style>
