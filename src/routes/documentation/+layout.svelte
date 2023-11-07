<script lang="ts">
	import { mergeObjects } from '$lib/utils/mergeObjects';
	import { setNestedProperty } from '$lib/utils/setMultipleKeys';

	const files = Object.keys(import.meta.globEager('./**/*.md'));
	const directories = files.map((f) => f.split('/').slice(1, -1)).slice(1);

	const directoryPaths = directories.map((keys) => setNestedProperty(keys, true));

	const directoryTree = mergeObjects(directoryPaths);
</script>

<div>
	<slot />
</div>

<aside>
	{JSON.stringify(directoryTree, null, 3)}
</aside>
