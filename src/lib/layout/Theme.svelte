<script>
	import { th } from '$lib/theme';
	import { onMount } from 'svelte';
	import { theme } from '../../stores';
	import { browser } from '$app/environment';

	theme.subscribe((t) => {
		if (browser) {
			// set a class on the hhtml element itself
			document.documentElement.classList.remove('light', 'dark');
			document.documentElement.classList.add(t);
		}
	});

	onMount(() => {
		const darkModePreference = window.matchMedia('(prefers-color-scheme: dark)');

		th();
		darkModePreference.addEventListener('change', () => th());
	});
</script>

<svelte:head>
	{#if $theme === 'light'}
		<meta name="theme-color" content="#fafafa" />
	{:else}
		<meta name="theme-color" content="#1f1f1f" />
	{/if}
</svelte:head>
