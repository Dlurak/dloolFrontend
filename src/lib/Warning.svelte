<script lang="ts">
	import { localstorage } from 'svocal';
	import I18n from './I18n.svelte';

	export let fullWidth = false;

	export let isDissmissable = { isDissmissable: false, uniqueIdentifier: '' };

	const dissmissedSvocal = localstorage(`warning.${isDissmissable.uniqueIdentifier}`, 0);
</script>

{#if new Date().getTime() > $dissmissedSvocal}
	<div
		class="border-yellow-600 dark:border-yellow-400 bg-yellow-300 bg-opacity-20 border-2 border-solid rounded-md flex gap-2 items-center px-3 py-2 warning-box"
		class:w-full={fullWidth}
	>
		<i class="bx bx-error text-4xl" />
		<span class="w-full">
			<slot />
		</span>

		{#if isDissmissable}
			<button
				class="rounded-md border-2 border-yellow-400 px-2 py-1 shadow-md hover:shadow-yellow-300 transition-all"
				on:click={() => {
					dissmissedSvocal.set(new Date().getTime() + 30 * 24 * 60 * 60 * 1_000);
				}}
			>
				<I18n key="warning.dissmiss" />
			</button>
		{/if}
	</div>
{/if}

<style>
	.warning-box {
		box-shadow: 0 0 0.5rem 0 rgb(250, 204, 21);
	}
</style>
