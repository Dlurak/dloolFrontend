<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { browser } from '$app/environment';

	const dispatch = createEventDispatcher();

	let thisEle: HTMLLIElement;

	/** change this to reevaluate the xOffset */
	export let reEvaluateEvent = 0;

	export let icon: string;

	export let isDragged = false;
	export let xCoord = 0;
	export let canBeRemoved = true;
	export let showRemove = true;

	const resetXCoord = () => {
		xCoord = thisEle.getBoundingClientRect().x;
	};

	onMount(() => {
		resetXCoord();
		dispatch('mount', {
			element: thisEle
		});
	});

	$: {
		if (browser && thisEle) {
			resetXCoord();
		}

		reEvaluateEvent;
	}
</script>

<svelte:window on:resize={resetXCoord} />

<li
	draggable="true"
	class="relative cursor-grab p-2 rounded-md w-14 aspect-square flex items-center justify-center bg-gray-300 dark:bg-gray-800 shadow-md hover:shadow-lg focus:shadow-lg transition-all"
	class:opacity-50={isDragged}
	on:dragstart={() => {
		isDragged = true;
		dispatch('dragstart');
	}}
	on:dragend={() => {
		isDragged = false;
		dispatch('dragend');
	}}
	on:touchstart={(e) => {
		e.preventDefault();

		isDragged = true;
		dispatch('dragstart');
	}}
	on:touchmove={(e) => {
		const touch = e.touches[0];

		xCoord = touch.clientX;

		dispatch('touch', { ...e, touch });
	}}
	on:touchend={(e) => {
		e.preventDefault();

		isDragged = false;
		dispatch('dragend');
	}}
	bind:this={thisEle}
>
	{#if showRemove}
		<button
			class="absolute top-[-0.875rem] left-[-0.875rem] w-7 h-7 p-1.5 flex items-center justify-center rounded-full bg-gray-400 dark:bg-gray-700 bg-opacity-50 disabled:cursor-not-allowed disabled:opacity-25"
			on:click={() => dispatch('remove')}
			disabled={!canBeRemoved}
		>
			<i class="bx bx-x" />
		</button>
	{/if}

	<i class="bx {icon} text-xl" />
</li>
