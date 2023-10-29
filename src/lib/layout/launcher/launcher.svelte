<script lang="ts">
	import { launcherLinks as rawLauncherLinks } from '../../../constants/launcher';
	import LauncherLink from './LauncherLink.svelte';
	import KeyboardShortcuts from './KeyboardShortcuts.svelte';
	import { findLinks } from './findLinks';

	let show = false;

	let searchTerm = '';

	let inputElement: HTMLInputElement;

	let entriesObj: Record<number, HTMLLIElement> = {};
	let linkListDiv: HTMLDivElement;

	let focusedId = 0;

	let launcherLinks = rawLauncherLinks;
	let launcherIds = launcherLinks.map((link) => link.id);
	type LauncherLink = (typeof launcherLinks)[number];

	const handleInput = () => {
		const queryObj: Record<number, string[]> = {};
		rawLauncherLinks.forEach((link) => {
			queryObj[link.id] = link.query;
		});

		if (searchTerm.trim() === '') {
			launcherLinks = rawLauncherLinks;
			launcherIds = launcherLinks.map((link) => link.id);
			return;
		}

		const filteredLinks = findLinks(searchTerm, queryObj).filter((v) => v[1] > 0.3);

		const linkIds = filteredLinks.map((v) => v[0]);
		const matches: Record<number, string> = {};
		filteredLinks.forEach((v) => {
			const id = v[0];
			const matchingWord = v[2];
			matches[id] = matchingWord;
		});

		const newLauncherLinks: LauncherLink[] = [];

		for (const linkId of linkIds) {
			const link = rawLauncherLinks.find((link) => link.id === linkId);
			if (link)
				newLauncherLinks.push({
					...link,
					matchingWord: matches[link.id]
				});
		}

		launcherLinks = newLauncherLinks;
		focusedId = launcherLinks.length > 0 ? launcherLinks[0].id : NaN;
		launcherIds = launcherLinks.map((link) => link.id);
	};

	const close = () => {
		show = false;
		focusedId = 0;
		searchTerm = '';
		launcherLinks = rawLauncherLinks;
		launcherIds = launcherLinks.map((link) => link.id);
	};
</script>

<KeyboardShortcuts
	bind:show
	bind:focusedId
	bind:linkIds={launcherIds}
	{close}
	{inputElement}
	{entriesObj}
	{linkListDiv}
	linkList={launcherLinks}
/>

<div
	class="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-80 z-50"
	class:hidden={!show}
	class:inline-block={show}
	on:click={(e) => {
		if (e.currentTarget === e.target) close();
	}}
	aria-hidden={show}
>
	<div
		class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90%,38rem)] flex-col gap-4"
		class:hidden={!show}
		class:flex={show}
	>
		<div class="shadow-nav rounded-md w-full bg-light-box dark:bg-dark-box">
			<div class="flex p-4 gap-2 items-center">
				<i class="bx bx-search text-xl" />
				<input
					type="search"
					placeholder="Type a search"
					class="bg-transparent w-full focus:outline-none focus:border-b-light-secondary dark:focus:border-b-dark-secondary focus:border-b-2 text-xl"
					bind:this={inputElement}
					bind:value={searchTerm}
					on:input={handleInput}
				/>
			</div>
		</div>

		<div
			class="shadow-nav rounded-md w-full bg-light-box dark:bg-dark-box py-2 max-h-[min(50vh,40rem)] overflow-y-scroll"
			bind:this={linkListDiv}
		>
			<ul class="w-full flex flex-col gap-2">
				{#each launcherLinks as link}
					{#key launcherLinks}
						<li bind:this={entriesObj[link.id]}>
							<LauncherLink
								{link}
								isFocused={link.id === focusedId}
								on:focus={() => (focusedId = link.id)}
								on:close={() => close()}
							/>
						</li>
					{/key}
					{#if link.id !== launcherIds.at(-1)}
						<hr class="border-gray-400 dark:border-gray-700" />
					{/if}
				{/each}
			</ul>
		</div>
	</div>
</div>
