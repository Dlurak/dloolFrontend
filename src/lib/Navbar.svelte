<script lang="ts">
	import { onMount } from 'svelte';
	import { i } from '@inlang/sdk-js';
	import Logo from './Logo.svelte';
	import type { NavDataEntry } from '../types/navData';

	import { loadLocaleJSONData } from './loadLocalData';
	import HamburgerButton from './navbar/hamburgerButton.svelte';
	import TextOrIconLink from './navbar/textOrIconLink.svelte';
	import LanguageSwitcher from './LanguageSwitcher.svelte';

	let navData: NavDataEntry[] = [];

	let isHamburgerOpened: boolean;

	export let height;

	onMount(async () => {
		navData = (await loadLocaleJSONData('nav')) as NavDataEntry[];
	});
</script>

<nav bind:clientHeight={height}>
	<Logo />
	<div id="items" class:mobileVisible={isHamburgerOpened}>
		<ul id="linkList">
			{#each navData as navDataEntry}
				<li>
					<TextOrIconLink
						show={navDataEntry.showInNav}
						boxIcon={navDataEntry.navBoxIcon}
						title={i(`nav.${navDataEntry.title}`)}
						uri={navDataEntry.uri}
					/>
				</li>
			{/each}
		</ul>
		<LanguageSwitcher />
	</div>
	<div id="hamburgerWrapper">
		<HamburgerButton bind:isOpened={isHamburgerOpened} />
	</div>
</nav>

<style>
	nav {
		height: 3rem;

		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		gap: 2rem;

		padding-inline: 2rem;
	}

	#items {
		display: flex;

		gap: 1rem;

		padding: 0;
	}

	ul {
		display: flex;
		flex-direction: row;
		gap: 1rem;

		padding: 0;

		list-style-type: none;
	}

	@media only screen and (max-width: 768px) {
		/* Small Screens */
		nav {
			padding-inline: 1rem;
			height: 2.5rem;
		}
		#items:not(.mobileVisible) {
			display: none;
		}

		#hamburgerWrapper {
			padding: 0;
			margin: 0;
			aspect-ratio: 1;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.mobileVisible {
			position: fixed;
			top: 2.5rem; /* The height of the navbar */
			bottom: 0;
			right: 0;

			margin: 0;

			width: 70%;

			display: flex;
			flex-direction: column;

			background-color: var(--background);

			z-index: 999;
		}

		#linkList {
			display: flex;
			flex-direction: column;
		}

		select {
			text-align: start;
		}

		li {
			width: 100%;
		}
	}

	@media only screen and (min-width: 768px) {
		/* Large Screens */
		#hamburgerWrapper {
			display: none;
		}
	}
</style>
