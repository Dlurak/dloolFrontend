<script lang="ts">
	import QuickActionButton from '$lib/QuickActionButton.svelte';
	import ColorPicker from '$lib/colors/ColorPicker.svelte';
	import { checkIfValid, parseContent, readFileContent } from '$lib/colors/downloadSubjectColors';
	import { subjectColors } from '../../stores';
	import { addToast } from '$lib/toast/addToast';

	let data = $subjectColors;

	subjectColors.subscribe((colors) => {
		data = colors;
	});

	const save = () => subjectColors.set(data);

	$: {
		save();

		data;
	}
</script>

<div>
	<section>
		<div class="flex justify-between">
			<h3>Farben für Fächer</h3>

			<div class="flex items-center gap-1">
				<QuickActionButton
					iconName="bxs-file-import"
					color="text-green-500 dark:text-green-400"
					title="Importiere die Farben von einer JSON-Datei"
					on:click={() => {
						if (
							!confirm(
								'Bist du sicher, dass du die Farben importieren möchtest? Die aktuellen Farben werden überschrieben.'
							)
						)
							return;

						const input = document.createElement('input');
						input.type = 'file';
						input.accept = '.json';

						input.onchange = async () => {
							const files = input.files;
							if (!files) return;
							const file = files[0];
							if (!file) return;

							const content = await readFileContent(file);
							const isValid = checkIfValid(content);

							if (!isValid) {
								addToast({
									type: 'error',
									content: 'error',
									// content: 'toast.colors.import.error',
									duration: 5000
								});
								return;
							}

							const parsed = parseContent(content);
							data = parsed;
							addToast({
								type: 'success',
								// content: 'toast.colors.import.success',
								content: 'class',
								duration: 5000
							});
						};

						input.click();
					}}
				/>

				<QuickActionButton
					iconName="bx-cloud-download"
					focusedIconName="bxs-cloud-download"
					color="text-blue-500 dark:text-blue-400"
					title="Downloade die Farben als JSON"
					on:click={() => {
						const dataStr =
							'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));
						const downloadAnchorNode = document.createElement('a');
						downloadAnchorNode.setAttribute('href', dataStr);
						downloadAnchorNode.download = 'subjectColors.json';

						downloadAnchorNode.click();
					}}
				/>
			</div>
		</div>
		<div class="flex flex-col gap-4">
			{#each data as entry}
				<div class="flex flex-row gap-2 items-center justify-between">
					<ColorPicker bind:r={entry.color.r} bind:g={entry.color.g} bind:b={entry.color.b} />

					<div class="flex flex-row items-center">
						<input
							bind:value={entry.subject}
							class="rounded-sm text-light-text dark:text-light-text px-2 py-0.5"
							placeholder="Fach"
						/>
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
