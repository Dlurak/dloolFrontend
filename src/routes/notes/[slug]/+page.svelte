<script lang="ts">
	import { goto } from '$app/navigation';
	import QuickActionButton from '$lib/QuickActionButton.svelte';
	import TimeAgo from '$lib/dates/TimeAgo.svelte';
	import DateLabel from '$lib/dates/dateLabel.svelte';
	import type { Note } from '../../../types/notes';
	import { focusedNote } from '../../stores';

	let note: Note | null | undefined;

	focusedNote.subscribe((value) => {
		note = value;
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
		</div>
	{:else}
		<p>Something unexpected happend</p>
	{/if}
</div>
