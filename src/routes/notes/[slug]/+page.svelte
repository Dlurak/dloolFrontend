<script lang="ts">
	import TimeAgo from '$lib/dates/TimeAgo.svelte';
	import DateLabel from '$lib/dates/dateLabel.svelte';
	import { i } from '@inlang/sdk-js';
	import type { Note } from '../../../types/notes';
	import { focusedNote } from '../../stores';
	import { browser } from '$app/environment';
	import QuickActionButton from '$lib/QuickActionButton.svelte';
	import { PUBLIC_API_URL } from '$env/static/public';

	let note: Note | null | undefined;
	let hasEditRights = false;

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
		}
	});
</script>

<div class="w-full h-full flex flex-col">
	{#if note}
		<div class=" w-full h-full">
			<div class="flex justify-between gap-2 items-baseline">
				<h3>{note.title}</h3>
				<DateLabel date={note.due} />
			</div>
			{note.content}
			<div class="flex justify-between items-baseline gap-2">
				<TimeAgo timestamp={note.createdAt} />
				{#if note.class}
					{note.class}
				{/if}
			</div>
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
				</div>
			{/if}
		</div>
	{:else}
		<p>{i('error')}</p>
	{/if}
</div>
