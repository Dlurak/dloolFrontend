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

	let footerHeight = 0;
	let navbarHeight = 0;

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

<!--These apply settings, update stores...-->
<Network />
<Settings />
<Title />
<Language />
<Theme />
<Logout />

<style>
	main {
		min-height: calc(100vh - var(--navbar-height) - var(--footer-height) - 2rem);
	}
</style>
