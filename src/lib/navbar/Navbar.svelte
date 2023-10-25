<script lang="ts">
	import { page } from '$app/stores';
	import { navData } from '../../constants/nav';
	import NavItem from './NavItem.svelte';

	export let height;

	const navDataEntries = navData.filter((navDataEntry) => navDataEntry.showInNav);

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
		class="bg-light-background dark:bg-dark-background bg-opacity-50 dark:bg-opacity-50 backdrop-blur-lg sm:backdrop-blur-3xl w-full px-3 py-2 sm:px-8 rounded-lg flex justify-between items-center gap-4 shadow-nav sm:shadow-none"
	>
		<a href="/" class="h-12 logo hidden sm:inline-block">
			<img src="/assets/dloolLogo.svg" alt="Logo" title="Dlool" class="h-full object-contain" />
		</a>
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
		</div>
	</nav>
</div>
