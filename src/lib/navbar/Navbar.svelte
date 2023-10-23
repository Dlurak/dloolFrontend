<script lang="ts">
	import { navData } from '../../constants/nav';
	import { i } from '../../languages/i18n';

	export let height;
</script>

<div
	class="p-4 md:p-0 fixed w-full bottom-8 z-10 md:sticky md:top-0 md:bottom-auto print:hidden"
	bind:clientHeight={height}
>
	<nav
		class="bg-light-background dark:bg-dark-background bg-opacity-50 dark:bg-opacity-50 backdrop-blur-lg md:backdrop-blur-3xl w-full px-3 py-2 md:px-8 rounded-lg flex justify-between items-center gap-4 shadow-nav md:shadow-none"
	>
		<a href="/" class="h-12 logo hidden md:inline-block">
			<img src="/assets/dloolLogo.svg" alt="Logo" title="Dlool" class="h-full object-contain" />
		</a>
		<div
			class="flex justify-around items-center gap-4 md:gap-8 w-full md:w-auto flex-wrap md:flex-nowrap"
		>
			{#each navData as navDataEntry}
				{#if navDataEntry.showInNav}
					<a
						class="flex flex-col justify-center items-center text-light-text dark:text-dark-text cursor-pointer relative after:absolute after:left-0 after:h-[2px] after:bg-light-text after:dark:bg-dark-text after:bottom-0 after:w-0 hover:after:w-full focus:after:w-full after:transition-all after:duration-300 after:ease-in-out focus:outline-none py-1"
						href={navDataEntry.uri}
					>
						<i class="bx {navDataEntry.navBoxIcon} text-lg" />
						<span class="text-xs">
							{i(`nav.${navDataEntry.title}`, {}, { transform: 'capitalize' })}
						</span>
					</a>
				{/if}
			{/each}
		</div>
	</nav>
</div>
