<script lang="ts">
	import { onMount } from 'svelte';

	export let disabled = false;
	export let value: string;

	export let onClick: (e: Event) => void = () => {
		return;
	};

	export let topMargin = '1rem';
	export let width = '100%';

	let buttonElement: HTMLElement;

	onMount(() => {
		buttonElement.style.marginTop = topMargin;
		buttonElement.style.width = width;
	});
</script>

<input
	type="submit"
	{value}
	{disabled}
	on:click={onClick}
	bind:this={buttonElement}
	class="rounded-md bg-green-600 text-white p-1 cursor-pointer w-full capitalize"
/>

<style>
	input[type='submit'] {
		margin-top: var(--margin-top);

		box-shadow: 0 0 2rem black;

		transition: all var(--transition-timing-function) var(--transition-timing);
	}

	input[type='submit']:not(:disabled):is(:hover, :focus) {
		translate: 0 -0.25rem;
		box-shadow: 0 15px 2rem black;

		outline: none;
	}

	input[type='submit']:active {
		transform: scale(0.95);
		box-shadow: 0 0 2.5rem black;
	}

	input[type='submit']:disabled {
		opacity: 0.7;
		box-shadow: none;
		cursor: not-allowed;
	}
</style>
