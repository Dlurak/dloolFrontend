<script lang="ts">
	import { onMount } from 'svelte';

	export let disabled = false;
	export let value: string = '';

	export let onClick: (e: Event) => void = () => {
		return;
	};

	export let topMargin = '1rem';
	export let width = '100%';

	export let colour: 'green' | 'red' | 'yellow' = 'green';

	let buttonElement: HTMLElement;

	onMount(() => {
		buttonElement.style.marginTop = topMargin;
		buttonElement.style.width = width;
	});
</script>

<button
	type="submit"
	{value}
	{disabled}
	on:click={onClick}
	bind:this={buttonElement}
	class="rounded-md {colour} text-white p-1 cursor-pointer w-full capitalize shadow-nav mt-[{topMargin}]"
>
	{value}
	<slot />
</button>

<style>
	button {
		transition: all var(--transition-timing-function) var(--transition-timing);
	}

	button:not(:disabled):is(:hover, :focus) {
		translate: 0 -0.25rem;

		outline: none;
	}

	button:active {
		transform: scale(0.95);
	}

	button:disabled {
		opacity: 0.7;
		box-shadow: none;
		cursor: not-allowed;
	}
	.green {
		background-color: rgb(22, 163, 74);
	}
	.red {
		background-color: rgb(220, 38, 38);
	}

	.yellow {
		background-color: rgb(234 179 8);
	}
</style>
