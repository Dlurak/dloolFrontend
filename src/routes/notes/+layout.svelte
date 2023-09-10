<script lang="ts">
	import NoteBox from '$lib/notes/NoteBox.svelte';
	import type { Note, NoteResponse } from '../../types/notes';
	import { page } from '$app/stores';
	import { focusedNote } from '../stores';
	import PageSelector from '$lib/homework/pageSelector.svelte';
	import { goto, invalidateAll } from '$app/navigation';
	import { onMount } from 'svelte';
	import { isLoggedIn } from '$lib/helpers/isLoggedIn';
	import SubmitButton from '$lib/SubmitButton.svelte';
	import QuickActionButton from '$lib/QuickActionButton.svelte';
	import { i } from '@inlang/sdk-js';

	export let data: NoteResponse | { noteDataAvailable: false };

	let currentPage = 1;
	const isSubPage = () => {
		const subPages = $page.url.pathname.split('/');
		return subPages.length > 2;
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
	let isNoteFocused = isSubPage();

	let isLoggedInBool = false;

	$: {
		slug = $page.params.slug;
		isNoteFocused = isSubPage();
		focusedNote.set(getFocusedNote());
	}

	onMount(() => {
		isLoggedInBool = isLoggedIn();

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
				{#if isLoggedInBool}
					<SubmitButton
						value={i('notes.create.button')}
						onClick={(e) => {
							e.preventDefault();
							focusedNote.set(null);
							goto('/notes/new');
						}}
					/>
				{/if}
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
			<p>{i('error')}</p>
		{/if}
	</div>

	<div class:hidden={!isNoteFocused} class="md:flex flex-col">
		<div class="flex flex-row">
			<QuickActionButton
				iconName="bx-arrow-back"
				on:click={() => {
					goto('/notes');
				}}
			/>
		</div>
		<div class="h-full w-full flex justify-center items-center">
			<slot />
		</div>
	</div>
</div>
