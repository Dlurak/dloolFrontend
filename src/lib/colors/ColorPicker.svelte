<script lang="ts">
	import Modal from '$lib/Modal.svelte';
	import SubmitButton from '$lib/SubmitButton.svelte';
	import type { IntRange } from '../../types/utils';

	export let r: IntRange<0, 256> = 0;
	export let g: IntRange<0, 256> = 0;
	export let b: IntRange<0, 256> = 0;

	export let open = false;

	const blackOrWhiteText = (r: number, g: number, b: number) => {
		const brightness = Math.round((r * 299 + g * 587 + b * 114) / 1000);
		return brightness > 125 ? 'black' : 'white';
	};

	let buttonTextColour = blackOrWhiteText(r, g, b);

	$: buttonTextColour = blackOrWhiteText(r, g, b);
</script>

<div style="--red: {r}; --green: {g}; --blue: {b};">
	<button
		class="bg-[rgb(var(--red),var(--green),var(--blue))] w-full h-full rounded-sm px-2 py-1"
		class:text-white={buttonTextColour === 'white'}
		class:text-black={buttonTextColour === 'black'}
		on:click={() => {
			open = !open;
		}}
	>
		Select
	</button>

	<Modal bind:open>
		<div class="grid grid-cols-[1fr,3fr]">
			Rot
			<input
				type="range"
				bind:value={r}
				min="0"
				max="255"
				class="w-full h-2 bg-[rgb(var(--red),0,0)] rounded-lg appearance-none cursor-pointer"
			/>
			Grün
			<input
				type="range"
				bind:value={g}
				min="0"
				max="255"
				class="w-full h-2 bg-[rgb(0,var(--green),0)] rounded-lg appearance-none cursor-pointer"
			/>
			Blau
			<input
				type="range"
				bind:value={b}
				min="0"
				max="255"
				class="w-full h-2 bg-[rgb(0,0,var(--blue))] rounded-lg appearance-none cursor-pointer"
			/>
		</div>

		<div class="bg-[rgb(var(--red),var(--green),var(--blue))] w-full h-32 rounded-lg" />

		<SubmitButton
			onClick={() => {
				console.log(`rgb(${r},${g},${b})`);
				open = false;
			}}
		>
			Select
		</SubmitButton>
	</Modal>
</div>
