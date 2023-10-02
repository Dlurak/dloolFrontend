<script lang="ts">
	import { languages, switchLanguage, language } from '@inlang/sdk-js';
	import { createEventDispatcher } from 'svelte';
	import { currentLanguage } from '../routes/stores';
	import { languageShortcuts, type Languages } from '../languages/i18n';

	let languagesObj: Record<Languages, string> = {
		en: 'English',
		de: 'Deutsch'
	};

	let selected: Languages;

	const dispatch = createEventDispatcher();
</script>

<select
	bind:value={selected}
	on:change={() => {
		switchLanguage(selected);
		currentLanguage.set(selected); // TODO: make it use the real function once inlang isn't used

		dispatch('change', selected);
	}}
	class="bg-transparent text-light-text dark:text-dark-text border-none p-1 rounded-md focus:bg-light-secondary dark:focus:bg-dark-secondary hover:bg-light-secondary dark:hover:bg-dark-secondary"
>
	{#each languageShortcuts as lang}
		<option value={lang} selected={lang === language}>{languagesObj[lang] || lang}</option>
	{/each}
</select>
