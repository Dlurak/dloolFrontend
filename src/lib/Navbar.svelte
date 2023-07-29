<script lang="ts">
	import { onMount } from 'svelte';
	import Logo from './Logo.svelte';
	import { loadLocaleJSONData } from './loadLocalData';
	import HamburgerButton from './navbar/hamburgerButton.svelte';
	import TextOrIconLink from './navbar/textOrIconLink.svelte';

	let navData: NavDataEntry[] = [];

	onMount(async () => {
		navData = (await loadLocaleJSONData('nav')) as NavDataEntry[];

		console.log(navData);
	});
</script>

<nav>
	<Logo />
	<ul>
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
	<HamburgerButton />
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
</style>
