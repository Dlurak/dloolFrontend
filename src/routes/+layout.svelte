<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import Navbar from '$lib/navbar/Navbar.svelte';
	import Footer from '$lib/footer/Footer.svelte';
	import Toasts from '$lib/toast/Toasts.svelte';

	import '../app.css';

	import Settings from '$lib/layout/settings.svelte';
	import Network from '$lib/layout/network.svelte';
	import Title from '$lib/layout/title.svelte';
	import Language from '$lib/layout/Language.svelte';
	import Logout from '$lib/layout/Logout.svelte';
	import Theme from '$lib/layout/Theme.svelte';
	import Launcher from '$lib/layout/launcher/launcher.svelte';
	import type { Languages } from '../languages/i18n';
	import { getLanguageShortcut, type LanguageShortcut } from '../constants/languages';
	import { addToast } from '$lib/toast/addToast';
	import { currentLanguage } from '../stores';
	import SendRootReq from '$lib/layout/SendRootReq.svelte';
	import TimeTable from '$lib/layout/TimeTable.svelte';

	let footerHeight = 0;
	let navbarHeight = 0;

	interface DataInterface {
		requestLanguage: Languages;
		favouriteLanguage: string;
		preferedLanguageAvaliable: boolean;
	}

	export let data: DataInterface;

	if (!data.preferedLanguageAvaliable) {
		const longLang = getLanguageShortcut(data.favouriteLanguage, $currentLanguage);
		if (longLang)
			addToast({
				content: 'toast.language.not.specific',
				type: 'info',
				duration: 5e3,
				contentOptions: {
					parts: {
						lang: longLang
					}
				}
			});
		else
			addToast({
				content: 'toast.language.not.general',
				type: 'info',
				duration: 5e3
			});
	}

	const updateCSSVariables = () => {
		if (browser) {
			document.documentElement.style.setProperty('--navbar-height', `${navbarHeight}px`);
			document.documentElement.style.setProperty('--footer-height', `${footerHeight}px`);
		}
	};

	onMount(() => {
		updateCSSVariables();
	});

	$: {
		updateCSSVariables();

		// just to have some dependencies
		footerHeight && navbarHeight;
	}
</script>

<Navbar bind:height={navbarHeight} />
<main class="flex flex-col items-center mx-2 md:mx-6 my-4">
	<slot />
</main>

<Footer bind:height={footerHeight} />

<Toasts />
<Launcher />

<!--These apply settings, update stores...-->
<Network />
<Settings />
<Title />
<Language defaultLanguage={data.requestLanguage} />
<Theme />
<Logout />
<TimeTable />
<SendRootReq />

<!--Those apply settings, update stores...-->

<style>
	main {
		min-height: calc(100vh - var(--navbar-height) - var(--footer-height) - 2rem);
	}
</style>
