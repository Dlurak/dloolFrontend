<script>
	import I18n from '$lib/I18n.svelte';
	import { settings, showLauncher } from '../../stores';

	let showText = true;

	settings.subscribe((s) => {
		showText = s.showTextInNavbar;
	});
</script>

<button
	class="flex flex-col justify-center items-center text-light-text dark:text-dark-text cursor-pointer relative after:absolute after:left-0 after:h-[2px] after:bg-light-text after:dark:bg-dark-text after:bottom-0 after:w-0 hover:after:w-full focus:after:w-full after:transition-all after:duration-300 after:ease-in-out focus:outline-none py-1"
	on:click={() => showLauncher.set(true)}
>
	<i class="bx bx-search text-lg" />
	{#if showText}
		<span class="text-xs text-ellipsis max-w-[5ch] overflow-hidden">
			<I18n key="nav.search" />
		</span>
	{/if}
</button>
