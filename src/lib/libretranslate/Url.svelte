<script lang="ts">
	import I18n from '$lib/I18n.svelte';
	import { localstorage } from 'svocal';
	import { i } from '../../languages/i18n';
	import { SvocalKeys } from '../../enums/svocal';

	let url = localstorage(SvocalKeys.LIBRETRANSLATE_URL, '')
</script>

<div
	class="w-full flex items-center justify-between flex-col @container @[32rem]/settings-slot:flex-row"
>
	<span class="flex items-center gap-1 font-bold w-full">
		<i class="bx bxs-server" />
		<I18n key="settings.language.url.base" />
	</span>

	<I18n>
		<input
			type="url"
			bind:value={$url}
			placeholder={i('settings.language.url')}
			class="h-full bg-transparent inline-block px-4 py-2 rounded-md text-light-text dark:text-dark-text border-solid border-emerald-400 dark:border-emerald-700 border-2"
		/>
	</I18n>
</div>
