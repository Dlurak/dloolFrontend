<script lang="ts">
	import { onMount } from 'svelte';
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

<nav
	bind:clientHeight={height}
	class="flex justify-between items-center gap-8 px-4 h-10 md:px-8 md:h-12 print:hidden"
>
	<Logo />
	<div
		class="lg:flex lg:flex-row flex-col gap-4 p-0 lg:static lg:inset-0 fixed top-10 bottom-0 right-0 m-0 lg:w-max w-[70%] bg-light-background dark:bg-dark-background lg:bg-transparent z-50 {isHamburgerOpened
			? 'flex'
			: 'hidden'}"
	>
		<ul id="linkList" class="flex flex-col lg:flex-row gap-4 p-0">
			{#each navData as navDataEntry}
				{#if navDataEntry.showInNav}
					<li class="w-full lg:w-auto">
						<TextOrIconLink
							boxIcon={navDataEntry.navBoxIcon}
							title={`nav.${navDataEntry.title}`}
							uri={navDataEntry.uri}
						/>
					</li>
				{/if}
			{/each}
		</ul>
		<LanguageSwitcher />
	</div>
	<div
		id="hamburgerWrapper"
		class="p-0 m-0 aspect-square h-full flex items-center justify-center lg:hidden"
	>
		<HamburgerButton bind:isOpened={isHamburgerOpened} />
	</div>
</nav>
