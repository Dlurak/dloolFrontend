<script lang="ts">
	import Toc from '$lib/documentation/TOC.svelte';
	import { mergeObjects } from '$lib/utils/mergeObjects';
	import { setNestedProperty } from '$lib/utils/setMultipleKeys';

	const files = Object.keys(import.meta.globEager('./**/*.md'));
	const directories = files.map((f) => f.split('/').slice(1, -1)).slice(1);

	const directoryPaths = directories.map((keys) => setNestedProperty(keys, true));

	const directoryTree = mergeObjects(directoryPaths);
</script>

<div class="grid grid-cols-[1fr,4fr] w-full gap-2">
	<div class="flex gap-2 justify-between">
		<aside>
			<h3>Table of contents</h3>
			<Toc {directoryTree} />
		</aside>

		<div class="bg-gray-400 rounded-full w-0.5" />
	</div>

	<div>
		<slot />
	</div>
</div>
