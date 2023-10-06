<script lang="ts">
	import { browser } from '$app/environment';
	import Navbar from '$lib/Navbar.svelte';
	import Footer from '$lib/footer/Footer.svelte';
	import Toasts from '$lib/toast/Toasts.svelte';

	import '../app.css';

	import { onDestroy, onMount } from 'svelte';
	import { currentLanguage, title } from './stores';
	import { i, type Languages } from '../languages/i18n';
	import { page } from '$app/stores';
	import { addToast } from '$lib/toast/addToast';
	import { isLoggedIn } from '$lib/helpers/isLoggedIn';

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

	let loggedIn = false;
	let prevLoggedIn = false;
	const loggedInInterval = setInterval(() => {
		if (browser) {
			loggedIn = isLoggedIn();
			prevLoggedIn = prevLoggedIn || loggedIn;
		}
	}, 1500);

	onMount(() => {
		updateCSSVariables();

		const languageLocalStorage = localStorage.getItem('language');
		if (languageLocalStorage) {
			currentLanguage.set(languageLocalStorage as Languages);
		}

		loggedIn = isLoggedIn();
	});

	onDestroy(() => {
		clearInterval(loggedInInterval);
	});

	$: {
		updateCSSVariables();

		// just to have some dependencies
		footerHeight && navbarHeight;
	}

	$: {
		if (!loggedIn && prevLoggedIn)
			addToast({
				content: 'toast.logout',
				type: 'info',
				duration: 5000
			});
	}
</script>

<svelte:head>
	<title>{tit}</title>
</svelte:head>

<Navbar bind:height={navbarHeight} />
<main class="flex flex-col items-center mx-2 md:mx-6 my-4">
	<slot />
</main>

<Footer bind:height={footerHeight} />

<Toasts />

<style>
	main {
		min-height: calc(100vh - var(--navbar-height) - var(--footer-height) - 2rem);
	}
</style>
