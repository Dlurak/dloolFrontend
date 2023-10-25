<script lang="ts">
	import { navData } from '../../constants/nav';
	import { i } from '../../languages/i18n';
	import { settings } from '../../routes/stores';

	export let uri: string;
	export let currentUri: string;
	export let navBoxIcon: string;

	const navDataTitles = navData
		.filter((navDataEntry) => navDataEntry.showInNav)
		.map((n) => n.title);

	type Title = (typeof navDataTitles)[number];

	export let title: Title;

	let showText = true;
	settings.subscribe((s) => {
		showText = s.showTextInNavbar;
	});
</script>

<a
	class="flex flex-col justify-center items-center text-light-text dark:text-dark-text cursor-pointer relative after:absolute after:left-0 after:h-[2px] after:bg-light-text after:dark:bg-dark-text after:bottom-0 after:w-0 hover:after:w-full focus:after:w-full after:transition-all after:duration-300 after:ease-in-out focus:outline-none py-1"
	href={uri}
>
	<div class="relative" class:active={currentUri.startsWith(uri)}>
		<i class="bx {navBoxIcon} text-lg z-10" />
	</div>
	{#if showText}
		<span class="text-xs">
			{i(`nav.${title}`, {}, { transform: 'capitalize' })}
		</span>
	{/if}
</a>

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
