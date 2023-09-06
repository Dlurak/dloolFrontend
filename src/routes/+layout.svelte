<script>
	import { browser } from '$app/environment';
	import Navbar from '$lib/Navbar.svelte';
	import Footer from '$lib/footer/Footer.svelte';

	import '../app.css';

	import { onMount } from 'svelte';

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

<style>
	main {
		min-height: calc(100vh - var(--navbar-height) - var(--footer-height) - 2rem);
	}
</style>
