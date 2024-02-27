<script lang="ts">
	import { loadUser } from '$lib/dlool/user';
	import I18n from '$lib/I18n.svelte';
	import Loader from '$lib/Loader.svelte';

	export let contributors: string[] = [];

	const isOneContributor = () => contributors.length === 1;

	let isCollapsed = true;
</script>

<div class="gap-2 flex items-start">
	<ul class:list-none={isOneContributor()}>
		{#each contributors as contri, i}
			<li class:hidden={isCollapsed && i > 0}>
				{#await loadUser(contri)}
					<Loader type="inline" />
				{:then userData}
					{userData.name}
				{:catch}
					<I18n key="error" />
				{/await}
			</li>
		{/each}
	</ul>

	{#if !isOneContributor()}
		<button on:click={() => (isCollapsed = !isCollapsed)}>
			<i class="bx" class:bx-chevron-down={isCollapsed} class:bx-chevron-up={!isCollapsed} />
		</button>
	{/if}
</div>
