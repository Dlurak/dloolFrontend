<script lang="ts">
	import { removeDuplicates } from '$lib/utils/removeDuplicates';
	import I18n from '$lib/I18n.svelte';
	import { navData } from '../../constants/nav';
	import { lowercase } from '../../types/strings/transformations';
	import TextOrIconLink from '$lib/navbar/textOrIconLink.svelte';

	const entries = navData.filter((entry) => entry.showInFooter);
	const categories = removeDuplicates(entries.map((entry) => entry.footerCategory));
	type TCategory = (typeof categories)[number];

	const entriesForCategory = (cat: TCategory) =>
		entries.filter((entry) => entry.footerCategory === cat);
</script>

<div>
	<h3><I18n key="footer.links" /></h3>

	<div class="grid grid-cols-[repeat(auto-fit,minmax(min(24rem,100%),1fr))] gap-4">
		{#each categories as category}
			<div>
				<h4 class="text-start md:text-center">
					<I18n key="nav.categories.{lowercase(category)}" />
				</h4>
				<ul class="grid grid-cols-[repeat(auto-fit,minmax(9rem,1fr))] list-none">
					{#each entriesForCategory(category) as entry}
						<li>
							<TextOrIconLink
								uri={entry.uri}
								title="nav.{entry.title}"
								boxIcon={entry.navBoxIcon}
							/>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</div>
