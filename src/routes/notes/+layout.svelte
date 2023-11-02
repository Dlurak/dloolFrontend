<script lang="ts">
	import NoteBox from '$lib/notes/NoteBox.svelte';
	import type { Note, NoteResponse } from '../../types/notes';
	import { page } from '$app/stores';
	import { focusedNote } from '../../stores';
	import PageSelector from '$lib/homework/pageSelector.svelte';
	import { goto, invalidateAll } from '$app/navigation';
	import { onMount } from 'svelte';
	import { isLoggedIn } from '$lib/helpers/isLoggedIn';
	import QuickActionButton from '$lib/QuickActionButton.svelte';
	import Box from '$lib/homework/Box.svelte';
	import I18n from '$lib/I18n.svelte';

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

<div class="w-full md:grid md:grid-cols-[1fr,2fr] gap-2 parent">
	<div class:hidden={isNoteFocused} class="w-full md:flex overflow-y-scroll">
		{#if data.noteDataAvailable}
			<ul class="flex flex-col gap-2 items-stretch w-full">
				{#if isLoggedInBool}
					<li>
						<a
							href="/notes/new"
							class="w-full h-full text-light-text dark:text-dark-text focus:outline focus:outline-3 focus:outline-light-accent focus:dark:outline-dark-accent rounded-sm"
						>
							<Box>
								<h4 class="flex gap-2 items-center">
									<i class="bx bxs-note" />
									<span><I18n key="notes.create.button" /></span>
								</h4>
							</Box>
						</a>
					</li>
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
			<p><I18n key="error" /></p>
		{/if}
	</div>

	<div class:hidden={!isNoteFocused} class="md:flex flex-col overflow-y-scroll">
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

<style>
	@media (min-width: 768px) {
		.parent {
			--basic-height: calc(100vh - var(--navbar-height) - var(--footer-height) - 2rem);
			max-height: calc(2 * var(--basic-height)); /* copied from the main +layout.svelte */
		}
	}
</style>
