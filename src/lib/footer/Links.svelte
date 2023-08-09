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
	<div class="row">
		{#each Object.keys(categories) as categoriy}
			<div class="category">
				<h4>{categoriy}</h4>
				<ul>
					{#each categories[categoriy] as entry}
						<li>
							<TextOrIconLink uri={entry.uri} title={entry.title} boxIcon={entry.navBoxIcon} />
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</div>

<style>
	.row {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1rem;
	}
	ul {
		list-style: none;
		padding: 0;

		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(5rem, 1fr));
	}

	.category {
		position: relative;
	}

	.category:not(:nth-last-col(0))::after {
		position: absolute;

		content: '';
		height: 100%;
		width: 0.125rem;
		right: -0.5rem;
		top: 0;

		border-radius: 100vmax;
		background-color: gray;
	}
</style>
