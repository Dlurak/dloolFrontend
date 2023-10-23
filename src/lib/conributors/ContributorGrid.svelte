<script lang="ts">
	import I18n from '$lib/I18n.svelte';
	import type { ContributorType } from '../../types/Contributors';
	import Contributor from './Contributor.svelte';

	export let data: ContributorType[];
	export let type: 'frontend' | 'backend';

	let repoName = type === 'frontend' ? 'dloolFrontend' : 'dloolBackend';
	let insightsUrl = `https://github.com/Dlurak/${repoName}/graphs/contributors`;
</script>

<h2><I18n key="contributors.{type}" /></h2>
<a href={insightsUrl}>See more on GitHub directly</a>
<div class="flex gap-2 flex-wrap">
	{#each data as contri}
		<Contributor {contri} />
	{/each}
</div>
