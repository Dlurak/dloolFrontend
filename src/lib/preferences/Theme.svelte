<script lang="ts">
	import I18n from '$lib/I18n.svelte';
	import { getLocalstorageString, setLocalstorageString } from '$lib/localstorage';
	import { th } from '$lib/theme';
	import { onMount } from 'svelte';
	import type { ThemeProvider } from '../../types/settings';
	import { theme } from '../../stores';

	let themeSelectValue: ThemeProvider = 'dark';

	onMount(() => {
		themeSelectValue = getLocalstorageString<ThemeProvider>('themeProvider', 'system');
	});
</script>

<div class="flex flex-row gap-2 items-center justify-between">
	<I18n key="settings.apperance.theme" />
	<span class="min-w-max">
		<select
			bind:value={themeSelectValue}
			on:change={() => {
				setLocalstorageString('themeProvider', themeSelectValue);
				if (themeSelectValue === 'light' || themeSelectValue === 'dark')
					theme.set(themeSelectValue);
				else if (themeSelectValue === 'system') {
					th();
				}
			}}
			class="w-full outline-1 outline-gray-400 outline rounded-sm p-1 bg-gray-200 dark:bg-gray-800"
		>
			<option value="system"><I18n key="settings.apperance.theme.system" /></option>
			<option value="light"><I18n key="settings.apperance.theme.light" /></option>
			<option value="dark"><I18n key="settings.apperance.theme.dark" /></option>
		</select>
	</span>
</div>
