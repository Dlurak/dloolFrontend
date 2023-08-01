<script lang="ts">
	import { onMount } from 'svelte';
	import { languages, switchLanguage, language } from '@inlang/sdk-js';
	import Logo from './Logo.svelte';

	import { loadLocaleJSONData } from './loadLocalData';
	import HamburgerButton from './navbar/hamburgerButton.svelte';
	import TextOrIconLink from './navbar/textOrIconLink.svelte';

	let navData: NavDataEntry[] = [];

	let selected: string;

	let isHamburgerOpened: boolean;

	onMount(async () => {
		navData = (await loadLocaleJSONData('nav')) as NavDataEntry[];
	});
</script>

<nav>
	<Logo />
	<div id="items" class:mobileVisible={isHamburgerOpened}>
		<ul id="linkList">
			{#each navData as navDataEntry}
				<li>
					<TextOrIconLink
						show={navDataEntry.showInNav}
						boxIcon={navDataEntry.navBoxIcon}
						title={navDataEntry.title}
						uri={navDataEntry.uri}
					/>
				</li>
			{/each}
		</ul>
		<select bind:value={selected} on:change={() => switchLanguage(selected)}>
			{#each languages as lang}
				<option value={lang} selected={lang === language}>{lang}</option>
			{/each}
		</select>
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
