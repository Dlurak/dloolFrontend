<script lang="ts">
	import { localstorage } from 'svocal';
	import { SvocalKeys } from '../../enums/svocal';
	import QuickActionButton from '$lib/QuickActionButton.svelte';
	import I18n from '$lib/I18n.svelte';

	const svocal = localstorage<string[]>(SvocalKeys.AUTOFILL_HOMEWORK_STRINGS, []);

	let inputValue = '';

	const isCompatibleWithList = (inputValue: string) => {
		const listIsEmpty = $svocal.length === 0;
		if (listIsEmpty) return true;

		const existsInList = $svocal.some((s) => s === inputValue);
		if (existsInList) return false;

		return true;
	};
</script>

<div class="flex justify-between">
	<span><I18n key="settings.homework.presets" /></span>

	<div class="flex flex-col">
		<ul>
			{#each $svocal as preset}
				<li class="flex justify-between items-center">
					{preset}
					<QuickActionButton
						iconName="bx-trash"
						color="text-red-600"
						on:click={() => {
							svocal.update((val) => val.filter((s) => s !== preset));
						}}
					/>
				</li>
			{/each}
		</ul>

		<span>
			<input
				class="rounded-sm text-light-text dark:text-light-text px-2 py-0.5"
				bind:value={inputValue}
			/>
			<QuickActionButton
				iconName="bx-plus"
				color="text-green-600"
				disabled={!isCompatibleWithList(inputValue) || !inputValue.trim()}
				on:click={() => {
					svocal.update((val) => [...val, inputValue.trim()]);
					inputValue = '';
				}}
			/>
		</span>
	</div>
</div>
