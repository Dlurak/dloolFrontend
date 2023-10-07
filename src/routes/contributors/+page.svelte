<script lang="ts">
	import I18n from '$lib/I18n.svelte';
	import ContributorGrid from '$lib/conributors/ContributorGrid.svelte';
	import type { ContributorType } from '../../types/Contributors';
	import { title } from '../stores';

	export let data: {
		frontend: ContributorType[] | null;
		backend: ContributorType[] | null;
	};

	title.set('contributors');
</script>

<section class="w-full">
	<h2><I18n key="contributors.frontend" /></h2>

	{#if data.frontend}
		<ContributorGrid data={data.frontend} />
	{:else}
		<p><I18n key="contributors.error" /></p>
	{/if}
</section>
<section class="w-full">
	<h2><I18n key="contributors.backend" /></h2>

	{#if data.backend}
		<ContributorGrid data={data.backend} />
	{:else}
		<p><I18n key="contributors.error" /></p>
	{/if}
</section>
