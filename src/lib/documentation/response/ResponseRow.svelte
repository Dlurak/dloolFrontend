<script lang="ts">
	import type { Response } from './types';

	interface TreeType extends Response {
		[key: string]: unknown;
	}

	export let field: string;
	export let tree: TreeType;
	export let indent = 0;

	const treeKeys = Object.keys(tree);
	const normalKeys = ['field', 'type', 'description', 'allowedValues', 'max', 'min'];
	const childrenKeys = treeKeys.filter((key) => !normalKeys.includes(key));
</script>

<tr>
	<td style="--indent: {indent}rem">{field}</td>
	<td>{tree.type}</td>
	<td>
		<div>
			{tree.description}
			<div class="empty:hidden flex gap-3 text-xs">
				{#if tree.allowedValues}
					<div>
						Possible Values:
						{#each tree.allowedValues as value}
							<span class="rounded-sm px-1 py-0.5 bg-gray-200 dark:bg-gray-800">{value}</span>
						{/each}
					</div>
				{/if}
				{#if tree.max}
					<div>
						Max: {tree.max}
					</div>
				{/if}
				{#if tree.min}
					<div>
						Min: {tree.min}
					</div>
				{/if}
			</div>
		</div>
	</td>
</tr>

{#each childrenKeys as childKey}
	<svelte:self field={childKey} tree={tree[childKey]} indent={indent + 1} />
{/each}

<style>
	td {
		--base-padding-x: 0.5rem;
		padding-left: var(--base-padding-x);
		padding-right: var(--base-padding-x);
	}
	tr td:first-child {
		padding-left: calc(var(--base-padding-x) + var(--indent));
	}
</style>
