<script lang="ts">
	import I18n from '$lib/I18n.svelte';
	import ContributorGrid from '$lib/conributors/ContributorGrid.svelte';
	import type { ContributorType } from '../../types/Contributors';
	import { title } from '../../stores';

	export let data: {
		frontend: ContributorType[] | null;
		backend: ContributorType[] | null;
	};

	title.set('contributors');
</script>

<section class="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
	<section class="w-full">
		{#if data.frontend}
			<ContributorGrid data={data.frontend} type="frontend" />
		{:else}
			<p><I18n key="contributors.error" /></p>
		{/if}
	</section>
	<section class="w-full">
		{#if data.backend}
			<ContributorGrid data={data.backend} type="backend" />
		{:else}
			<p><I18n key="contributors.error" /></p>
		{/if}
	</section>
</section>
