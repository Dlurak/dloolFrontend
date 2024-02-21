<script lang="ts">
	import { page } from '$app/stores';
	import HalloweenLogo from '$lib/seasons/halloween/halloweenLogo.svelte';
	import StPatricksLogo from '$lib/seasons/stPatricks/StPatricksLogo.svelte';
	import { isSpecialDate } from '$lib/specialDates/isInRange';
	import { navData } from '../../constants/nav';
	import { settings } from '../../stores';
	import NavItem from './NavItem.svelte';
	import NavSearchButton from './NavSearchButton.svelte';

	export let height;

	const navDataEntries = navData.filter((navDataEntry) => navDataEntry.showInNav);

	let currentUri = $page.url.pathname as string;

	let showSearch = $settings.showSearchInNavbar;

	settings.subscribe((s) => (showSearch = s.showSearchInNavbar));

	page.subscribe(() => {
		currentUri = $page.url.pathname;
	});
</script>

<div
	class="p-4 sm:p-0 fixed w-full bottom-8 z-10 sm:sticky sm:top-0 sm:bottom-auto print:hidden"
	bind:clientHeight={height}
>
	<nav
		class="bg-light-background dark:bg-dark-background bg-opacity-50 dark:bg-opacity-50 backdrop-blur-lg sm:backdrop-blur-3xl w-full px-3 py-2 sm:px-8 rounded-lg sm:rounded-none flex justify-between items-center gap-4 shadow-nav sm:shadow-none"
	>
		<div class="h-12 hidden sm:inline-block">
			{#if isSpecialDate('helloween')}
				<HalloweenLogo />
			{:else if isSpecialDate('stPatricks')}
				<StPatricksLogo />
			{:else}
				<a href="/">
					<img src="/assets/dloolLogo.svg" alt="Logo" title="Dlool" class="h-full object-contain" />
				</a>
			{/if}
		</div>
		<div
			class="flex justify-around items-center gap-1 sm:gap-8 w-full sm:w-auto flex-wrap sm:flex-nowrap"
		>
			{#each navDataEntries as navDataEntry}
				<NavItem
					uri={navDataEntry.uri}
					{currentUri}
					navBoxIcon={navDataEntry.navBoxIcon}
					title={navDataEntry.title}
				/>
			{/each}
			{#if showSearch}
				<NavSearchButton />
			{/if}
		</div>
	</nav>
</div>
