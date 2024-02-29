<script lang="ts">
	import { page } from '$app/stores';
	import HalloweenLogo from '$lib/seasons/halloween/halloweenLogo.svelte';
	import StPatricksLogo from '$lib/seasons/stPatricks/StPatricksLogo.svelte';
	import { isSpecialDate } from '$lib/specialDates/isInRange';
	import { localstorage } from 'svocal';
	import NavItem from './NavItem.svelte';
	import NavSearchButton from './NavSearchButton.svelte';
	import { SvocalKeys } from '../../enums/svocal';
	import { type Id, navbarData } from '../../constants/navbar';
	import { sortByDifferentArray } from '$lib/utils/arrays/sort';
	import { getEntries } from '$lib/utils/objects/entries';

	export let height;

	let selectedItems = localstorage<Id[]>(SvocalKeys.NAVBAR_IDS, [
		'login',
		'homework',
		'events',
		'notes'
	]);

	const getNavEntries = () => {
		const allEntries = getEntries(navbarData);
		const selectedEntries = allEntries.filter(([entry]) =>
			($selectedItems as string[]).includes(entry)
		);
		return sortByDifferentArray(selectedEntries, $selectedItems, ([title]) => title);
	};

	let navEntries = getNavEntries();
	selectedItems.subscribe(() => {
		navEntries = getNavEntries();
	});

	let currentUri = $page.url.pathname as string;

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
			{#key navEntries}
				{#each navEntries as navEntry}
					{@const data = navEntry[1]}
					{#if data.type === 'uri'}
						<NavItem uri={data.uri} {currentUri} navBoxIcon={data.boxIcon} title={data.title} />
					{:else if data.id === 'search'}
						<NavSearchButton />
					{/if}
				{/each}
			{/key}
		</div>
	</nav>
</div>
