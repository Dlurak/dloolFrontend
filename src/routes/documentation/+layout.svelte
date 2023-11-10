<script lang="ts">
	import I18n from '$lib/I18n.svelte';
	import QuickActionButton from '$lib/QuickActionButton.svelte';
	import Toc from '$lib/documentation/TOC.svelte';
	import { mergeObjects } from '$lib/utils/mergeObjects';
	import { setNestedProperty } from '$lib/utils/setMultipleKeys';
	import { i } from '../../languages/i18n';

	const files = Object.keys(import.meta.globEager('./**/*.md'));
	const directories = files.map((f) => f.split('/').slice(1, -1)).slice(1);

	const directoryPaths = directories.map((keys) => setNestedProperty(keys, true));

	const directoryTree = mergeObjects(directoryPaths);

	let collapsed = false;
</script>

<svelte:window
	on:resize={() => {
		const isBig = window.innerWidth >= 768;

		if (isBig) collapsed = false;
	}}
/>

<div class="flex flex-col md:grid md:grid-cols-[1fr,4fr] w-full gap-2">
	<aside class="flex flex-col md:flex-row gap-2 justify-between">
		<div>
			<div class="flex justify-between gap-3">
				<h3><I18n key="toc" /></h3>
				<I18n>
					<QuickActionButton
						iconName="bx-chevron-down"
						color="inline-block md:hidden"
						title={i(`toc.${collapsed ? 'expand' : 'collapse'}`)}
						on:click={() => {
							collapsed = !collapsed;
						}}
					/>
				</I18n>
			</div>
			{#if !collapsed}
				<Toc {directoryTree} />
			{/if}
		</div>

		<div class="bg-gray-400 rounded-full w-full h-0.5 md:w-0.5 md:h-full" />
	</aside>

	<div>
		<slot />
	</div>
</div>
