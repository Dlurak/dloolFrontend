<script>
	import { toasts } from '../../routes/stores';
	import Toast from './Toast.svelte';
</script>

{#if $toasts}
	<div
		id="toast-container"
		class="fixed bottom-[calc(2rem+var(--navbar-height))] sm:bottom-8 right-1/2 translate-x-1/2 w-full max-w-[min(80%,36rem)] flex flex-col gap-3"
	>
		{#each $toasts as toastObj}
			<Toast toast={toastObj} />
		{/each}
	</div>
{/if}
