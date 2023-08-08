<script lang="ts">
	import { onMount } from 'svelte';
	import type { NavDataEntry } from '../../types/navData';
	import { loadLocaleJSONData } from '$lib/loadLocalData';
	import TextOrIconLink from '$lib/navbar/textOrIconLink.svelte';

	interface categories {
		[key: string]: NavDataEntry[];
	}

	let navData: NavDataEntry[] = [];

	let entries = [];

	let categories: categories = {};

	onMount(async () => {
		navData = (await loadLocaleJSONData('nav')) as NavDataEntry[];

		entries = navData.filter((entry) => entry.showInFooter);

		categories = entries.reduce((acc: categories, entry) => {
			return {
				...acc,
				[entry.footerCategory]: [...(acc[entry.footerCategory] || []), entry]
			};
		}, {});
	});
</script>

<div class="column">
	<h3>Links</h3>
	{#each Object.keys(categories) as categoriy}
		<h4>{categoriy}</h4>
		<ul>
			{#each categories[categoriy] as entry}
				<li>
					<TextOrIconLink uri={entry.uri} title={entry.title} boxIcon={entry.navBoxIcon} />
				</li>
			{/each}
		</ul>
	{/each}
</div>
