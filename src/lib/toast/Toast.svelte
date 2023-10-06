<script lang="ts">
	import I18n from '$lib/I18n.svelte';
	import { toasts } from '../../routes/stores';
	import type { Toast, ToastType } from '../../types/toast';

	export let toast: Toast;

	let doneMs = 0;
	const doneInterval = setInterval(() => {
		doneMs += 10;
		if (!toast.duration || doneMs >= toast.duration) clearInterval(doneInterval);
	}, 10);

	const removeSelf = () => {
		clearInterval(doneInterval);
		toasts.update((toasts) => toasts.filter((t) => t.id !== toast.id));
	};

	if (toast.duration) setTimeout(removeSelf, toast.duration);

	type ToastTypeRecord = Record<ToastType, string>;
	const icons: ToastTypeRecord = {
		success: 'bx-check-circle',
		warning: 'bx-error',
		error: 'bx-error-alt',
		info: 'bx-info-circle'
	};
	const colors: ToastTypeRecord = {
		success: 'bg-green-500',
		warning: 'bg-yellow-500',
		error: 'bg-red-500',
		info: 'bg-light-box dark:bg-dark-box'
	};
	let icon = icons[toast.type];
	let color = colors[toast.type];

	$: {
		icon = icons[toast.type];
		color = colors[toast.type];
	}
</script>

<div
	class="w-full {color} p-4 rounded-sm shadow-2xl text-base relative flex justify-between items-center"
>
	<div class="flex gap-1 items-center">
		<i class="bx {icon}" />
		<I18n key={toast.content} />
	</div>
	<button class="aspect-square h-full" on:click={removeSelf}>
		<i class="bx bx-x" />
	</button>

	{#if toast.duration}
		<progress
			value={doneMs}
			max={toast.duration}
			class="w-full h-1 absolute bottom-0 left-0 right-0 rounded-sm"
		/>
	{/if}
</div>
