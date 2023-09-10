<script lang="ts">
	import TimeAgo from '$lib/dates/TimeAgo.svelte';
	import DateLabel from '$lib/dates/dateLabel.svelte';
	import Box from '$lib/homework/Box.svelte';
	import type { Note } from '../../types/notes';

	export let note: Note;
</script>

<Box id={note._id}>
	<div class="flex justify-between gap-2 align-baseline">
		<h3 class="truncate w-80">{note.title}</h3>
		<DateLabel date={note.due} />
	</div>
	<p class="line-clamp-3">{note.content}</p>
	<div class="flex justify-between align-baseline gap-2">
		<TimeAgo timestamp={note.createdAt} />
		{#if note.class}
			<p>{note.class}</p>
		{/if}
	</div>
</Box>
