<script lang="ts">
	import I18n from '$lib/I18n.svelte';
	import Modal from '$lib/Modal.svelte';
	import SubmitButton from '$lib/SubmitButton.svelte';
	import type { RangeRGB } from '../../types/subjectColors';
	import { rgbToHex } from './hexToRgb';

	export let r: RangeRGB = 0;
	export let g: RangeRGB = 0;
	export let b: RangeRGB = 0;

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
		<slot>
			{rgbToHex(r, g, b)}
		</slot>
	</button>

	<Modal bind:open>
		<div class="flex flex-col gap-2 py-2">
			<div class="flex items-center gap-1">
				<I18n key="colors.red" />
				<input
					type="range"
					bind:value={r}
					min="0"
					max="255"
					class="w-full h-2 bg-[rgb(var(--red),0,0)] rounded-lg appearance-none cursor-pointer"
				/>
			</div>
			<div class="flex items-center gap-1">
				<I18n key="colors.green" />
				<input
					type="range"
					bind:value={g}
					min="0"
					max="255"
					class="w-full h-2 bg-[rgb(0,var(--green),0)] rounded-lg appearance-none cursor-pointer"
				/>
			</div>
			<div class="flex items-center gap-1">
				<I18n key="colors.blue" />
				<input
					type="range"
					bind:value={b}
					min="0"
					max="255"
					class="w-full h-2 bg-[rgb(0,0,var(--blue))] rounded-lg appearance-none cursor-pointer"
				/>
			</div>
		</div>

		<div class="bg-[rgb(var(--red),var(--green),var(--blue))] w-full h-32 rounded-lg" />

		<SubmitButton
			onClick={() => {
				open = false;
			}}
		>
			<I18n key="colors.select" />
		</SubmitButton>
	</Modal>
</div>
