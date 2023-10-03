<script lang="ts">
	import { onMount } from 'svelte';
	import type { NavDataEntry } from '../../types/navData';
	import TextOrIconLink from '$lib/navbar/textOrIconLink.svelte';
	import I18n from '$lib/I18n.svelte';
	import { navData } from '../../constants/nav';

	interface categories {
		[key: string]: NavDataEntry[];
	}

	let entries = [];

	let categories: categories = {};

	onMount(async () => {
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
	<h3><I18n key="footer.links" /></h3>
	<div class="row">
		{#each Object.keys(categories) as categoriy}
			<div class="category">
				<h4 class="text-start md:text-center">
					<I18n unsaveKey="nav.categories.{categoriy.toLowerCase().replaceAll(' ', '-')}" />
				</h4>
				<ul>
					{#each categories[categoriy] as entry}
						<li>
							<I18n>
								<TextOrIconLink
									uri={entry.uri}
									title="nav.{entry.title}"
									boxIcon={entry.navBoxIcon}
								/>
							</I18n>
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
		grid-template-columns: repeat(auto-fit, minmax(min(24rem, 100%), 1fr));
		gap: 1rem;
	}
	ul {
		list-style: none;
		padding: 0;

		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr));
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
