<script lang="ts">
	import NoteBox from '$lib/notes/NoteBox.svelte';
	import { onMount } from 'svelte';
	import type { NoteResponse } from '../../types/notes';
	import { page } from '$app/stores';

	export let data: NoteResponse | { noteDataAvailable: false };

	const getIsNoteFocused = () => {
		return slug !== undefined;
	};

	let { slug } = $page.params;
	let isNoteFocused = getIsNoteFocused();
	$: {
		slug = $page.params.slug;
		isNoteFocused = getIsNoteFocused();
	}
</script>

<div class="w-full h-full md:grid md:grid-cols-[1fr,2fr] gap-2">
	<div class="md:flex h-full" class:hidden={isNoteFocused}>
		{#if data.noteDataAvailable}
			<ul class="flex flex-col gap-2 w-full">
				{#each data.data.notes as note}
					<li>
						<NoteBox {note} />
					</li>
				{/each}
			</ul>
		{:else}
			<p>A error occured</p>
		{/if}
	</div>

	<div class:hidden={!isNoteFocused} class="md:flex items-center justify-center">
		<slot />
	</div>
</div>
