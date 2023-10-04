<script lang="ts">
	import { browser } from '$app/environment';
	import Navbar from '$lib/Navbar.svelte';
	import Footer from '$lib/footer/Footer.svelte';

	import '../app.css';

	import { onMount } from 'svelte';
	import { currentLanguage, title } from './stores';
	import { i, type Languages, type Token } from '../languages/i18n';
	import I18n from '$lib/I18n.svelte';
	import { page } from '$app/stores';

	let footerHeight = 0;
	let navbarHeight = 0;

	let specificTitleToken = $title;
	title.subscribe((v) => (specificTitleToken = v));

	let tit = 'Dlool';
	const setTitle = () => {
		console.log(specificTitleToken);
		if (specificTitleToken) {
			tit = `Dlool | ${i(specificTitleToken, {}, { transform: 'capitalize' })}`;
		} else {
			tit = 'Dlool';
		}
	};

	page.subscribe(() => setTitle());
	currentLanguage.subscribe(() => setTitle());

	const updateCSSVariables = () => {
		if (browser) {
			document.documentElement.style.setProperty('--navbar-height', `${navbarHeight}px`);
			document.documentElement.style.setProperty('--footer-height', `${footerHeight}px`);
		}
	};

	onMount(() => {
		updateCSSVariables();

		const languageLocalStorage = localStorage.getItem('language');
		if (languageLocalStorage) {
			currentLanguage.set(languageLocalStorage as Languages);
		}
	});

	$: {
		updateCSSVariables();

		// just to have some dependencies
		footerHeight && navbarHeight;
	}
</script>

<svelte:head>
	<!-- {#key specificTitleToken}
		<I18n>
			{#if specificTitleToken}
				<title>Dlool | {i(specificTitleToken)}</title>
			{:else}
				<title>Dlool</title>
			{/if}
		</I18n>
	{/key} -->
	<title>{tit}</title>
</svelte:head>
<Navbar bind:height={navbarHeight} />
<main class="flex flex-col items-center mx-2 md:mx-6 my-4">
	<slot />
</main>

<Footer bind:height={footerHeight} />

<style>
	main {
		min-height: calc(100vh - var(--navbar-height) - var(--footer-height) - 2rem);
	}
</style>
