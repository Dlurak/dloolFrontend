<script lang="ts">
	import I18n from '$lib/I18n.svelte';
	import { toasts } from '../../stores';
	import type { Toast, ToastType } from '../../types/toast';

	export let toast: Toast;

	let hovering = false;
	let doneMs = 0;
	const doneInterval = setInterval(() => {
		if (!hovering) {
			doneMs += 5;
			if (!toast.duration || doneMs >= toast.duration) clearInterval(doneInterval);
		}

		if (toast.duration && doneMs >= toast.duration) removeSelf();
	}, 5);

	const removeSelf = () => {
		clearInterval(doneInterval);
		toasts.update((toasts) => toasts.filter((t) => t.id !== toast.id));
	};

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
	const borderColors: ToastTypeRecord = {
		success: 'border-green-500',
		warning: 'border-yellow-500',
		error: 'border-red-500',
		info: 'border-gray-600'
	};

	let icon = icons[toast.type];
	let color = colors[toast.type];
	let borderColor = borderColors[toast.type];
</script>

<button
	class="w-full {color} p-4 rounded-sm shadow-2xl text-base relative flex justify-between items-center overflow-hidden focus:outline-none"
	on:mouseenter={() => (hovering = true)}
	on:mouseleave={() => (hovering = false)}
	on:touchstart={() => (hovering = true)}
	on:touchend={() => (hovering = false)}
	on:touchcancel={() => (hovering = false)}
	on:focus={() => (hovering = true)}
	on:blur={() => (hovering = false)}
	on:click={removeSelf}
>
	<div class="w-full h-full flex justify-between items-center">
		<div class="flex gap-1 items-center">
			<i class="bx {icon}" />
			<I18n key={toast.content} />
		</div>
		<div class="aspect-square h-full">
			<i class="bx bx-x" />
		</div>

		{#if toast.duration}
			<progress
				value={doneMs}
				max={toast.duration}
				class="w-full h-1 absolute bottom-0 left-0 right-0 rounded-sm"
			/>
		{/if}
	</div>

	<div
		class="w-full h-full flex justify-center items-center bg-black bg-opacity-80 absolute bottom-0 left-0 right-0 top-0 border-4 {borderColor}"
		class:hidden={!hovering}
	>
		<i class="bx bx-x text-2xl" />
	</div>
</button>
