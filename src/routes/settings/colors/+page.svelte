<script lang="ts">
	import QuickActionButton from '$lib/QuickActionButton.svelte';
	import ColorPicker from '$lib/colors/ColorPicker.svelte';
	import { checkIfValid, parseContent, readFileContent } from '$lib/colors/downloadSubjectColors';
	import { subjectColors, title } from '../../../stores';
	import { addToast } from '$lib/toast/addToast';
	import I18n from '$lib/I18n.svelte';
	import { i } from '../../../languages/i18n';
	import { subjectsSortetCapitalized } from '../../../constants/subjecticons';

	let data = $subjectColors;

	subjectColors.subscribe((colors) => {
		data = colors;
	});

	const save = () => subjectColors.set(data);

	title.set('settings.subjectColors');

	$: {
		save();

		data;
	}
</script>

<div>
	<section>
		<div class="flex justify-between">
			<h3><I18n key="settings.subjectColors" /></h3>

			<div class="flex items-center gap-1">
				<I18n>
					<QuickActionButton
						iconName="bxs-file-import"
						color="text-green-500 dark:text-green-400"
						title={i('settings.subjectColors.import')}
						on:click={() => {
							if (data.length > 0 && !confirm(i('settings.subjectColors.import.confirm'))) return;

							const input = document.createElement('input');
							input.type = 'file';
							input.accept = '.json';

							input.onchange = async () => {
								const files = input.files;
								if (!files) {
									addToast({
										type: 'error',
										content: 'toast.colors.import.error',
										duration: 5000
									});
									return;
								}
								const file = files[0];
								if (!file) {
									addToast({
										type: 'error',
										content: 'toast.colors.import.error',
										duration: 5000
									});
									return;
								}

								const content = await readFileContent(file);
								const isValid = checkIfValid(content);

								if (!isValid) {
									addToast({
										type: 'error',
										content: 'toast.colors.import.invalidFile',
										duration: 5000
									});
									return;
								}

								const parsed = parseContent(content);
								data = parsed;
								addToast({
									type: 'success',
									content: 'toast.colors.import.success',
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
						title={i('settings.subjectColors.export')}
						on:click={() => {
							const encodedPart = encodeURIComponent(JSON.stringify(data));
							const dataStr = 'data:text/json;charset=utf-8,' + encodedPart;
							const downloadAnchorNode = document.createElement('a');
							downloadAnchorNode.setAttribute('href', dataStr);
							downloadAnchorNode.download = 'subjectColors.json';

							downloadAnchorNode.click();
						}}
					/>
				</I18n>
			</div>
		</div>

		<p><I18n key="settings.subjectColors.explaination" /></p>

		<div class="flex flex-col gap-4">
			{#each data as entry}
				<div class="flex flex-row gap-2 items-center justify-between">
					<ColorPicker bind:r={entry.color.r} bind:g={entry.color.g} bind:b={entry.color.b} />

					<div class="flex flex-row items-center">
						<I18n>
							<input
								bind:value={entry.subject}
								class="rounded-sm text-light-text dark:text-light-text px-2 py-0.5"
								placeholder={i('settings.subjectColors.subject')}
								list="subjects"
							/>
							<QuickActionButton
								iconName="bx-trash"
								focusedIconName="bx-trash"
								color="text-red-500 dark:text-red-400"
								title={i('settings.subjectColors.subject.remove')}
								on:click={() => {
									const index = data.indexOf(entry);
									data.splice(index, 1);
									data = [...data];
								}}
							/>
						</I18n>
					</div>
				</div>
			{/each}
			<datalist id="subjects">
				{#each subjectsSortetCapitalized as subj}
					<option value={subj} />
				{/each}
			</datalist>
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
				class="flex flex-row items-center gap-2 justify-center rounded-md hover:bg-light-box focus:bg-light-box dark:focus:bg-dark-box dark:hover:bg-dark-box p-2"
			>
				<i class="bx bx-plus" />
				<I18n key="settings.subjectColors.subject.add" />
			</button>
		</div>
	</section>
</div>
