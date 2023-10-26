<script>
	import { createEventDispatcher } from 'svelte';

	export let checked = false;

	const dispatch = createEventDispatcher();
</script>

<input
	type="checkbox"
	role="switch"
	bind:checked
	class="appearance-none w-14 h-7 rounded-full relative bg-gray-400 dark:bg-gray-500 checked:bg-green-500 dark:checked:bg-green-400"
	on:change={() => {
		dispatch('change', checked);
	}}
/>

<style>
	input::before {
		--parent-height: 1.75rem;
		--parent-width: 3.5rem;

		--height: calc(0.8 * var(--parent-height));

		--top: calc(calc(var(--parent-height) - var(--height)) / 2);

		content: '';
		position: absolute;

		top: var(--top);
		left: var(--top);

		height: var(--height);
		width: var(--height);

		border-radius: 100vmax;

		background-color: white;
		box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);

		transition: all var(--transition);
	}

	input:checked::before {
		transform: translateX(calc(var(--parent-width) - var(--height) - var(--top) - var(--top)));
	}

	input {
		transition: all var(--transition);
	}
</style>
