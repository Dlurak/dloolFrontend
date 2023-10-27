<script lang="ts">
	import QuickActionButton from '$lib/QuickActionButton.svelte';
	import ColorPicker from '$lib/colors/ColorPicker.svelte';
	import { hexToRgb } from '$lib/colors/hexToRgb';
	import type { IntRange } from '../../../types/utils';
	import { subjectColors } from '../../stores';

	let data: {
		subject: string;
		color: {
			r: IntRange<0, 255>;
			g: IntRange<0, 255>;
			b: IntRange<0, 255>;
		};
	}[] = Object.keys($subjectColors).map((subject) => ({
		subject,
		color: hexToRgb($subjectColors[subject])
	}));
</script>

<div>
	<section>
		<h3>Farben für Fächer</h3>
		<div class="flex flex-col gap-4">
			{#each data as entry}
				<div class="flex flex-row gap-2 items-center justify-between">
					<ColorPicker bind:r={entry.color.r} bind:g={entry.color.g} bind:b={entry.color.b} />

					<div class="flex flex-row items-center">
						<input bind:value={entry.subject} class="rounded-sm text-light-text dark:text-light-text px-2 py-0.5" placeholder="Fach" />
						<QuickActionButton
							iconName="bx-trash"
							focusedIconName="bx-trash"
							color="text-red-500 dark:text-red-400"
							title="Farbe entfernen"
							on:click={() => {
								const index = data.indexOf(entry);
								data.splice(index, 1);
								data = [...data];
							}}
						/>
					</div>
				</div>
			{/each}
			<button
				on:click={() => {
					data = [
						...data,
						{
							subject: '',
							color: {
								r: 63,
								g: 81,
								b: 181
							}
						}
					];
				}}
			>
				Neues Fach hinzufügen
			</button>
		</div>
	</section>
</div>
