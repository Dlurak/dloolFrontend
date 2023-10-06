<script>
	import { toasts } from '../../routes/stores';
	import Toast from './Toast.svelte';
</script>

{#if $toasts}
	<div id="toast-container">
		{#each $toasts as toastObj}
			<Toast toast={toastObj} />
		{/each}
	</div>
{/if}

<style>
	#toast-container {
		position: fixed;
		bottom: 2rem;
		right: 50%;
		transform: translate(50%);

		max-width: min(80%, 36rem);

		width: 100%;

		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}
</style>
