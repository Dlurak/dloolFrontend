<script lang="ts">
	import NoteBox from '$lib/notes/NoteBox.svelte';
	import type { Note, NoteResponse } from '../../types/notes';
	import { page } from '$app/stores';
	import { focusedNote } from '../stores';
	import PageSelector from '$lib/homework/pageSelector.svelte';
	import { goto, invalidateAll } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data: NoteResponse | { noteDataAvailable: false };

	let currentPage = 1;
	const getIsNoteFocused = () => {
		return slug !== undefined;
	};
	const getFocusedNote = () => {
		if (slug === undefined) return null;
		if (data.noteDataAvailable === false) return null;
		const note = data.data.notes.find((note: Note) => note._id === slug) as Note;
		return note;
	};

	const setPage = (page: number) => {
		currentPage = page;
		const url = new URL(window.location.href);
		url.searchParams.set('page', page.toString());
		goto(url.toString()).then(() => {
			invalidateAll();
			data = data;
		});
	};

	let { slug } = $page.params;
	let isNoteFocused = getIsNoteFocused();
	$: {
		slug = $page.params.slug;
		isNoteFocused = getIsNoteFocused();
		focusedNote.set(getFocusedNote());
	}

	onMount(() => {
		const currentUrlPage = $page.url.searchParams.get('page');
		console.log(currentUrlPage);
		const currentPage = parseInt(currentUrlPage ?? '1');
		let totalPageCount = 1;
		if (data.noteDataAvailable) {
			totalPageCount = data.data.pageCount;
		}

		if (currentPage > totalPageCount) {
			setPage(totalPageCount);
		} else if (currentPage < 1) {
			setPage(1);
		} else {
			setPage(currentPage);
		}
	});
</script>

<div class="w-full h-full md:grid md:grid-cols-[1fr,2fr] gap-2">
	<div class="md:flex h-full" class:hidden={isNoteFocused}>
		{#if data.noteDataAvailable}
			<ul class="flex flex-col gap-2">
				{#each data.data.notes as note}
					<li>
						<NoteBox {note} />
					</li>
				{/each}
				{#if data.data.pageCount > 1}
					<li>
						<PageSelector
							totalPageCount={data.data.pageCount}
							bind:currentPage
							setPageFunction={setPage}
						/>
					</li>
				{/if}
			</ul>
		{:else}
			<p>A error occured</p>
		{/if}
	</div>

	<div class:hidden={!isNoteFocused} class="md:flex items-center justify-center">
		<slot />
	</div>
</div>
