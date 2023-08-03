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

<input type="submit" {value} {disabled} on:click={onClick} bind:this={buttonElement} />

<style>
	input[type='submit'] {
		border: none;
		border-radius: 0.4rem;
		background-color: green;
		color: white;
		padding: 0.25rem;
		cursor: pointer;

		width: 100%;

		margin-top: var(--margin-top);

		box-shadow: 0 0 2rem black;

		text-transform: capitalize;
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
