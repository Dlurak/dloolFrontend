<script lang="ts">
	import { languages, switchLanguage, language } from '@inlang/sdk-js';

	let selected: string;
</script>

<select
	bind:value={selected}
	on:change={() => switchLanguage(selected)}
	class="bg-transparent text-light-text dark:text-dark-text border-none p-1 rounded-md focus:bg-light-secondary dark:focus:bg-dark-secondary hover:bg-light-secondary dark:hover:bg-dark-secondary"
>
	{#each languages as lang}
		<option value={lang} selected={lang === language}>{lang}</option>
	{/each}
</select>
