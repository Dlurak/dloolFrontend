<script lang="ts">
	import { mergeObjects } from '$lib/utils/mergeObjects';
	import { setNestedProperty } from '$lib/utils/setMultipleKeys';
	import ResponseRow from './ResponseRow.svelte';
	import type { Response } from './types';

	const statusCodes = {
		200: 'OK'
	};

	type StatusCode = keyof typeof statusCodes;

	export let status: StatusCode;
	export let response: Response[];

	const responseKeys = response.map((res) => res.field.split('.'));
	const responseTrees = responseKeys.map((r) =>
		setNestedProperty(
			r,
			response.find((res) => res.field === r.join('.'))
		)
	);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const responseTree = mergeObjects(responseTrees) as Record<string, any>;
</script>

<h4>{status} {statusCodes[status]}</h4>
<table>
	<thead>
		<tr>
			<th>Field</th>
			<th>Value</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		{#each Object.keys(responseTree) as field}
			<ResponseRow {field} tree={responseTree[field]} />
		{/each}
	</tbody>
</table>
