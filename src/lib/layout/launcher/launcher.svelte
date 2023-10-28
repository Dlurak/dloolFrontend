<script lang="ts">
	import { launcherLinks } from '../../../constants/launcher';
	import LauncherLink from './LauncherLink.svelte';
	import KeyboardShortcuts from './KeyboardShortcuts.svelte';

	let show = false;
	let inputElement: HTMLInputElement;

	let entriesObj: Record<number, HTMLLIElement> = {};
	let linkListDiv: HTMLDivElement;

	let focusedId = 0;

	const highesId = launcherLinks.reduce((acc, curr) => {
		if (curr.id > acc) return curr.id;
		return acc;
	}, 0);
</script>

<KeyboardShortcuts
	bind:show
	bind:focusedId
	{inputElement}
	{highesId}
	{entriesObj}
	{linkListDiv}
	linkList={launcherLinks}
/>

<div
	class="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-80 z-50"
	class:hidden={!show}
	class:inline-block={show}
	on:click={(e) => {
		if (e.currentTarget === e.target) show = false;
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
					placeholder="Type a search (doesn't work yet; stay tuned!)"
					class="bg-transparent w-full focus:outline-none focus:border-b-light-secondary dark:focus:border-b-dark-secondary focus:border-b-2 text-xl"
					bind:this={inputElement}
				/>
			</div>
		</div>

		<div
			class="shadow-nav rounded-md w-full bg-light-box dark:bg-dark-box py-2 max-h-[min(50vh,40rem)] overflow-y-scroll"
			bind:this={linkListDiv}
		>
			<ul class="w-full flex flex-col gap-2">
				{#each launcherLinks as link}
					<li bind:this={entriesObj[link.id]}>
						<LauncherLink
							{link}
							isFocused={link.id === focusedId}
							on:focus={() => (focusedId = link.id)}
							on:close={() => (show = false)}
						/>
					</li>
					{#if link.id !== highesId}
						<hr class="border-gray-400 dark:border-gray-700" />
					{/if}
				{/each}
			</ul>
		</div>
	</div>
</div>
