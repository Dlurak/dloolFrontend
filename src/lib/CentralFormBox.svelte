<script lang="ts">
	import type { Token } from '../languages/i18n';
	import I18n from './I18n.svelte';
	import CommunicationText from './communicationText.svelte';

	export let linkName: Token | undefined = undefined;
	export let linkHref = '';

	export let onSubmit: (e: Event) => void = (e) => e.preventDefault();

	export let successText: Token | undefined = undefined;
	export let errorText: Token | undefined = undefined;

	export let title: Token;
</script>

<div
	class="flex flex-col p-4 box-border rounded-xl text-center w-full bg-light-box dark:bg-dark-box md:w-[clamp(19rem,50%,25rem)]"
>
	<h3><I18n key={title} /></h3>

	<form
		on:submit={(e) => {
			e.preventDefault();
			onSubmit(e);
		}}
		class="flex flex-col gap-2 mb-4"
	>
		<slot />
	</form>

	{#if linkName}
		<span>
			<a href={linkHref} class="text-xs"><I18n key={linkName} /></a>
		</span>
	{/if}

	<CommunicationText type="success" text={successText} />
	<CommunicationText type="error" text={errorText} />
</div>
