<script lang="ts">
	export let directoryTree: Record<string, unknown>;
	export let finalPath: unknown = true;

	export let currentPath = '/';
</script>

<ul class="list-none">
	{#each Object.keys(directoryTree) as key}
		<li class="capitalize">
			<a href="/documentation{currentPath}{key}">
				{key.replaceAll('-', ' ')}
			</a>
			{#if directoryTree[key] !== finalPath}
				<div class="pl-6">
					<svelte:self
						directoryTree={directoryTree[key]}
						{finalPath}
						currentPath={currentPath + key + '/'}
					/>
				</div>
			{/if}
		</li>
	{/each}
</ul>
