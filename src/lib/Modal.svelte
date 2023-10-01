<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import QuickActionButton from './QuickActionButton.svelte';

	export let open = false;

	export let title = '';

	let dialogElement: HTMLDialogElement;
	const dispatch = createEventDispatcher();

	const openDialog = () => {
		if (!dialogElement) return;
		dispatch('open');
		dialogElement.showModal();
		open = true;

		window.addEventListener(
			'keydown',
			(e) => {
				if (e.key === 'Escape') {
					closeDialog();
				}
			},
			{ once: true }
		);
	};
	const closeDialog = () => {
		if (!dialogElement) return;
		dispatch('close');
		dialogElement.close();
		open = false;
	};

	$: {
		if (open) openDialog();
		else closeDialog();
	}
</script>

<dialog
	class="p-4 rounded-md backdrop:bg-black backdrop:opacity-50 resize bg-light-box dark:bg-dark-box text-light-text dark:text-dark-text"
	bind:this={dialogElement}
>
	<div class="w-full flex flex-row justify-between items-center @container">
		<h3>
			{title}
		</h3>
		<QuickActionButton iconName="bx-x" on:click={closeDialog} />
	</div>
	<slot />
</dialog>
