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

<nav
	bind:clientHeight={height}
	class="flex justify-between items-center gap-8 px-4 h-10 md:px-8 md:h-12 print:hidden"
>
	<Logo />
	<div
		class="md:flex md:flex-row flex-col gap-4 p-0 md:static md:inset-0 fixed top-10 bottom-0 right-0 m-0 md:w-max w-[70%] bg-light-background dark:bg-dark-background md:bg-transparent z-50 {isHamburgerOpened
			? 'flex'
			: 'hidden'}"
	>
		<ul id="linkList" class="flex flex-col md:flex-row gap-4 p-0">
			{#each navData as navDataEntry}
				<li class="w-full md:w-auto">
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
	<div
		id="hamburgerWrapper"
		class="p-0 m-0 aspect-square h-full flex items-center justify-center md:hidden"
	>
		<HamburgerButton bind:isOpened={isHamburgerOpened} />
	</div>
</nav>
