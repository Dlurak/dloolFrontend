<script lang="ts">
	import { languages, switchLanguage, language } from '@inlang/sdk-js';

	let selected: string;
</script>

<select bind:value={selected} on:change={() => switchLanguage(selected)}>
	{#each languages as lang}
		<option value={lang} selected={lang === language}>{lang}</option>
	{/each}
</select>

<style>
	select {
		background-color: transparent;
		color: var(--text);
		border: none;
		padding: 0.2rem;
		border-radius: 0.25rem;
	}

	select:is(:focus, :hover) {
		background-color: var(--secondary);
	}
</style>
