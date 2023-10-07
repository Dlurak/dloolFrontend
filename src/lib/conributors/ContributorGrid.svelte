<script lang="ts">
	import type { ContributorType } from '../../types/Contributors';
	import Contributor from './Contributor.svelte';

	export let data: ContributorType[];
</script>

<div class="flex gap-2 flex-wrap">
	{#each data as contri}
		<Contributor {contri} />
	{/each}
</div>
