<script lang="ts">
	import I18n from '$lib/I18n.svelte';
	import { i } from '../../languages/i18n';
	import { localstorage } from 'svocal';
	import { SvocalKeys } from '../../enums/svocal';

	let showTipp = localstorage(SvocalKeys.LIBRE_TRANSLATE_TOKEN_SHOW_TIPP, false);
	let token = localstorage(SvocalKeys.LIBRETRANSLATE_TOKEN, '');
</script>

<div
	class="w-full flex items-center justify-between flex-col @container @[32rem]/settings-slot:flex-row"
>
	<span class="flex flex-col justify-center gap-1 font-bold w-full">
		<div class="flex items-center gap-1">
			<i class="bx bxs-lock" />
			<I18n key="settings.language.token.base" />
			<button on:click={() => showTipp.set(!$showTipp)} class="bx bx-question-mark" />
		</div>
		{#if $showTipp}
			<I18n key="settings.language.token.tipp" />
		{/if}
	</span>

	<I18n>
		<input
			type="text"
			placeholder={i('settings.language.token')}
			bind:value={$token}
			class="h-full bg-transparent inline-block px-4 py-2 rounded-md text-light-text dark:text-dark-text border-solid border-emerald-400 dark:border-emerald-700 border-2"
		/>
	</I18n>
</div>
