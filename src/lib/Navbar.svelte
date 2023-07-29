<script lang="ts">
	import { onMount } from 'svelte';
	import Logo from './Logo.svelte';
	// @ts-ignore
	import { loadLocaleJSONData } from './loadLocalData';
	import HamburgerButton from './navbar/hamburgerButton.svelte';
	import TextOrIconLink from './navbar/textOrIconLink.svelte';

	let navData: NavDataEntry[] = [];

	let isHamburgerOpened: boolean;

	onMount(async () => {
		navData = (await loadLocaleJSONData('nav')) as NavDataEntry[];

		console.log(navData);
	});
</script>

<nav>
	<Logo />
	<ul id="linkList" class:mobileVisible={isHamburgerOpened}>
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
		#linkList:not(.mobileVisible) {
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
