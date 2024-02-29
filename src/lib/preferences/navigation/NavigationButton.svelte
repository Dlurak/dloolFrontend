<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher();

	let thisEle: HTMLLIElement;

	export let icon: string;

	export let isDragged = false;
	export let xCoord = 0;

	const resetXCoord = () => (xCoord = thisEle.getBoundingClientRect().x);

	onMount(resetXCoord);
</script>

<svelte:window on:resize={resetXCoord} />

<li
	draggable="true"
	class="cursor-grab p-2 rounded-md w-14 aspect-square flex items-center justify-center bg-gray-300 dark:bg-gray-800 shadow-md hover:shadow-lg focus:shadow-lg transition-all"
	class:opacity-50={isDragged}
	on:dragstart={() => {
		isDragged = true;
		dispatch('dragstart');
	}}
	on:dragend={() => {
		isDragged = false;
		dispatch('dragend');
	}}
	bind:this={thisEle}
>
	<i class="bx {icon} text-xl" />
</li>
