<script lang="ts">
	import LauncherLink from './LauncherLink.svelte';
	import KeyboardShortcuts from './KeyboardShortcuts.svelte';
	import { findLinks } from './findLinks';
	import {
		launcherLinks,
		launcherSearchTerm,
		showLauncher,
		unfilteredLauncherLinks
	} from '../../../stores';
	import { launcherLinks as launcherLinksConst } from '../../../constants/launcher';
	import type { launcherLink } from '../../../types/launcher';
	import type { Token } from '../../../languages/i18n';

	let show = false;

	let inputElement: HTMLInputElement;

	let entriesObj: Record<number, HTMLLIElement> = {};
	let linkListDiv: HTMLDivElement;

	let focusedId = 0;

	let launcherIds = $launcherLinks.map((link) => link.id);

	const handleInput = () => {
		const queryObj: Record<number, string[]> = {};
		$unfilteredLauncherLinks.forEach((link) => {
			queryObj[link.id] = link.query;
		});

		if ($launcherSearchTerm.trim() === '') {
			launcherLinks.set($unfilteredLauncherLinks);
			return;
		}

		const filteredLinks = findLinks($launcherSearchTerm, queryObj).filter((v) => v[1] > 0.3);

		const linkIds = filteredLinks.map((v) => v[0]);
		const matches: Record<number, string> = {};
		filteredLinks.forEach((v) => {
			const id = v[0];
			const matchingWord = v[2];
			matches[id] = matchingWord;
		});

		const newLauncherLinks: launcherLink<Token>[] = [];

		for (const linkId of linkIds) {
			const link = $unfilteredLauncherLinks.find((link) => link.id === linkId);
			if (link)
				newLauncherLinks.push({
					...link,
					matchingWord: matches[link.id]
				});
		}
		launcherLinks.set(newLauncherLinks);
	};

	showLauncher.subscribe((v) => {
		if (v) {
			show = true;
		} else {
			show = false;
			focusedId = 0;
			$launcherSearchTerm = '';
			launcherLinks.set(launcherLinksConst);
			unfilteredLauncherLinks.set(launcherLinksConst);

			launcherIds = launcherLinksConst.map((link) => link.id);
		}
	});

	launcherLinks.subscribe((v) => {
		launcherIds = v.map((link) => link.id);
		focusedId = v.length > 0 ? v[0].id : NaN;
	});
</script>

<KeyboardShortcuts
	bind:focusedId
	bind:linkIds={launcherIds}
	{inputElement}
	{entriesObj}
	{linkListDiv}
	linkList={$launcherLinks}
/>

<div
	class="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-80 z-50"
	class:hidden={!show}
	class:inline-block={show}
	on:click={(e) => {
		if (e.currentTarget === e.target) showLauncher.set(false);
	}}
	aria-hidden={show}
>
	<div
		class="fixed top-[12.5%] left-1/2 -translate-x-1/2 w-[min(90%,38rem)] flex-col gap-4"
		class:hidden={!show}
		class:flex={show}
	>
		<div class="shadow-nav rounded-md w-full bg-light-box dark:bg-dark-box">
			<div class="flex p-4 gap-2 items-center">
				<i class="bx bx-search text-xl" />
				<input
					type="search"
					placeholder="Type a search"
					class="bg-transparent w-full focus:outline-none border-b-transparent pb-0.5 focus:border-b-light-secondary dark:focus:border-b-dark-secondary border-b-2 text-xl"
					bind:this={inputElement}
					bind:value={$launcherSearchTerm}
					on:input={handleInput}
				/>
			</div>
			{#if $launcherLinks.length}
				<div class="w-full py-2 max-h-[min(50vh,40rem)] overflow-y-scroll" bind:this={linkListDiv}>
					<ul class="w-full flex flex-col gap-2 list-none">
						{#each $launcherLinks as link}
							{#key $launcherLinks}
								<li bind:this={entriesObj[link.id]}>
									<LauncherLink
										{link}
										isFocused={link.id === focusedId}
										on:focus={() => (focusedId = link.id)}
										on:close={() => showLauncher.set(false)}
									/>
								</li>
							{/key}
							{#if link.id !== launcherIds.at(-1)}
								<hr class="border-gray-400 dark:border-gray-700" />
							{/if}
						{/each}
					</ul>
				</div>
			{/if}
		</div>
	</div>
</div>
