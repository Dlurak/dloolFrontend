<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { currentLanguage } from '../../stores';
	import type { Languages } from '../../languages/i18n';

	export let defaultLanguage: Languages;
	currentLanguage.set(defaultLanguage);

	currentLanguage.subscribe((l) => {
		if (browser) document.getElementsByTagName('html')[0].lang = l;
	});

	onMount(() => {
		const languageLocalStorage = localStorage.getItem('language');
		if (languageLocalStorage) currentLanguage.set(languageLocalStorage as Languages);
	});
</script>
