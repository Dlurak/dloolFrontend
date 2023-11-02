<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { currentLanguage } from '../stores';
	import { languageShortcuts, type Languages, switchLanguage } from '../languages/i18n';

	let languagesObj: Record<Languages, string> = {
		en: 'English',
		de: 'Deutsch'
	};

	let selected: Languages = $currentLanguage;

	const dispatch = createEventDispatcher();
</script>

<select
	bind:value={selected}
	on:change={() => {
		switchLanguage(selected);

		dispatch('change', selected);
	}}
	class="bg-transparent text-light-textlanguage dark:text-dark-text border-none p-1 rounded-md focus:bg-light-secondary dark:focus:bg-dark-secondary hover:bg-light-secondary dark:hover:bg-dark-secondary"
>
	{#each languageShortcuts as lang}
		<option value={lang} selected={lang === $currentLanguage}>{languagesObj[lang]}</option>
	{/each}
</select>
