<script lang="ts">
	import TimeAgo from '$lib/dates/TimeAgo.svelte';
	import DateLabel from '$lib/dates/dateLabel.svelte';
	import { i } from '@inlang/sdk-js';
	import type { Note } from '../../../types/notes';
	import { focusedNote } from '../../stores';
	import { browser } from '$app/environment';
	import QuickActionButton from '$lib/QuickActionButton.svelte';
	import { PUBLIC_API_URL } from '$env/static/public';
	import Input from '$lib/auth/Input.svelte';
	import SubmitButton from '$lib/SubmitButton.svelte';

	let note: Note | null | undefined;
	let hasEditRights = false;
	let editMode = false;

	let title = note?.title || '';
	let content = note?.content || '';

	let disabled = true;

	focusedNote.subscribe((value) => {
		note = value;
		const noteCreator = note?.creator;

		if (browser) {
			const userId = localStorage.getItem('userId');
			const userExpires = parseInt(localStorage.getItem('userExpires') || '0');
			const now = Date.now();

			const userIsCreator = noteCreator === userId;
			const userIsExpired = userExpires < now;

			hasEditRights = userIsCreator && !userIsExpired;

			title = note?.title || '';
			content = note?.content || '';
		}
	});

	$: {
		const isTitleValid = title.length > 0 && title.length < 64;
		const isContentValid = content.length > 0 && content.length < 512;

		const isTitleInvalid = !isTitleValid;
		const isContentInvalid = !isContentValid;

		disabled = isTitleInvalid || isContentInvalid;
	}
</script>

<svelte:head>
	<title>Dlool | {note?.title || i('notes.selected.none')}</title>
</svelte:head>

<div class="w-full h-full flex flex-col">
	{#if note}
		<div class=" w-full h-full">
			<div class="flex justify-between gap-2 items-baseline">
				{#if editMode}
					<textarea
						maxlength="63"
						bind:value={title}
						placeholder={i('notes.create.title')}
						class="rounded-sm text-2xl font-bold w-full"
					/>
				{:else}
					<h3>{note.title}</h3>
				{/if}
				<DateLabel date={note.due} />
			</div>
			{#if editMode}
				<textarea
					maxlength="511"
					bind:value={content}
					placeholder={i('notes.create.content')}
					class="rounded-sm w-full"
				/>
			{:else}
				{note.content}
			{/if}
			<div class="flex justify-between items-baseline gap-2">
				<TimeAgo timestamp={note.createdAt} />
				{#if note.class}
					{note.class}
				{/if}
			</div>
			{#if editMode}
				<SubmitButton
					value="Update"
					{disabled}
					onClick={() => {
						fetch(`${PUBLIC_API_URL}/notes/${note?._id}`, {
							method: 'PATCH',
							headers: {
								Authorization: `Bearer ${localStorage.getItem('token')}`,
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({
								title,
								content
							})
						}).then(() => {
							window.location.reload();
						});
					}}
				/>
			{/if}
			{#if hasEditRights}
				<div>
					<QuickActionButton
						iconName="bx-trash"
						focusedIconName="bxs-trash"
						color="text-red-500 dark:text-red-400"
						on:click={() => {
							if (!confirm('Are you sure you want to delete this note?')) return;
							fetch(`${PUBLIC_API_URL}/notes/${note?._id}`, {
								method: 'DELETE',
								headers: {
									Authorization: `Bearer ${localStorage.getItem('token')}`
								}
							}).then(() => {
								window.location.href = '/notes';
							});
						}}
					/>
					<QuickActionButton
						iconName="bx-edit"
						focusedIconName="bxs-edit"
						color="text-blue-500 dark:text-blue-400"
						on:click={() => {
							editMode = !editMode;
						}}
					/>
				</div>
			{/if}
		</div>
	{:else}
		<p>{i('error')}</p>
	{/if}
</div>

<style>
	textarea {
		color: var(--text);
		background-color: transparent;
	}

	textarea:focus-visible {
		outline: 2px solid var(--accent);
	}
</style>
