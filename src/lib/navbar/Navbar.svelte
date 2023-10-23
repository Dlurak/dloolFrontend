<script lang="ts">
	import { page } from '$app/stores';
	import { navData } from '../../constants/nav';
	import { i } from '../../languages/i18n';

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
			class="flex justify-around items-center gap-4 sm:gap-8 w-full sm:w-auto flex-wrap sm:flex-nowrap"
		>
			{#each navDataEntries as navDataEntry}
				<a
					class="flex flex-col justify-center items-center text-light-text dark:text-dark-text cursor-pointer relative after:absolute after:left-0 after:h-[2px] after:bg-light-text after:dark:bg-dark-text after:bottom-0 after:w-0 hover:after:w-full focus:after:w-full after:transition-all after:duration-300 after:ease-in-out focus:outline-none py-1"
					href={navDataEntry.uri}
				>
					<div class="relative" class:active={currentUri.startsWith(navDataEntry.uri)}>
						<i class="bx {navDataEntry.navBoxIcon} text-lg z-10" />
					</div>
					<span class="text-xs">
						{i(`nav.${navDataEntry.title}`, {}, { transform: 'capitalize' })}
					</span>
				</a>
			{/each}
		</div>
	</nav>
</div>

<style>
	.active::before {
		content: '';

		position: absolute;
		top: 50%;
		right: 50%;
		transform: translate(50%, -50%);
		z-index: -1;

		border-radius: 100vmax;

		height: 125%;
		aspect-ratio: 1;

		background-color: var(--secondary);
	}
</style>
