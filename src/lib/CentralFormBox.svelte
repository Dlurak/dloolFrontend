<script lang="ts">
	import CommunicationText from './communicationText.svelte';

	export let linkName = '';
	export let linkHref = '';

	export let onSubmit: (e: Event) => void = (e) => e.preventDefault();

	export let successText = '';
	export let errorText = '';

	export let title = '';
</script>

<div
	class="flex flex-col p-4 box-border rounded-xl text-center w-full bg-light-box dark:bg-dark-box md:w-[clamp(19rem,50%,25rem)]"
>
	<h3>{title}</h3>

	<form
		on:submit={(e) => {
			e.preventDefault();
			onSubmit(e);
		}}
		class="flex flex-col gap-2 mb-4"
	>
		<slot />
	</form>

	<span>
		<a href={linkHref} class="text-xs">{linkName}</a>
	</span>

	<CommunicationText type="success" text={successText} />
	<CommunicationText type="error" text={errorText} />
</div>
