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

<main>
	<slot />
</main>

<Footer bind:height={footerHeight} />

<style>
	main {
		margin-inline: 1.5rem;
		margin-block: 1rem;

		display: flex;
		flex-direction: column;
		align-items: center;

		min-height: calc(100vh - var(--navbar-height) - var(--footer-height) - 2rem);
	}
</style>
