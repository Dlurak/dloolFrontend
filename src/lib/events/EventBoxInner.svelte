<script lang="ts">
	import TimeAgo from '$lib/dates/TimeAgo.svelte';
	import type { Event } from '../../types/events';

	export let event: Event;
	export let showTitle = true;

	const editorLength = event.editors.length;
	const hasMultipleVersions = editorLength > 1;

	const startDate = new Date(
		event.date.year,
		event.date.month - 1,
		event.date.day,
		event.date.hour,
		event.date.minute,
		0,
		0
	);
	const endDate = new Date(startDate.getTime() + event.duration * 1000);
</script>

<div class="grid grid-cols-1 @sm:grid-cols-2 justify-between gap-2">
	{#if showTitle}
		<h3>{event.title}</h3>
	{/if}
	<h3 class="@sm:text-right">{event.subject}</h3>
</div>

<p>{event.description}</p>

<div class="flex justify-between gap-2 flex-wrap">
	<span>
		{startDate.toLocaleString()} - {endDate.toLocaleTimeString()}
	</span>
	{#if event.location}
		<span class="flex gap-1 items-center">
			<i class="bx bxs-map" />
			{event.location}
		</span>
	{/if}
	<span>
		{event.class}
		{event.school}
	</span>
</div>

<hr />

<div class="flex justify-between align-baseline gap-2">
	<div class="flex flex-col gap-1">
		<TimeAgo timestamp={event.editedAt[0]} />
		{#if hasMultipleVersions}
			<TimeAgo
				timestamp={event.editedAt[editorLength - 1]}
				type="edited"
				classes="text-sm text-gray-600 dark:text-gray-300"
			/>
		{/if}
	</div>

	<div class="flex flex-col gap-1">
		<span>
			Erstellt von {event.editors[0]}
		</span>
		{#if hasMultipleVersions}
			<span class="text-sm text-gray-600 dark:text-gray-300">
				Zuletzt bearbeitet von {event.editors[editorLength - 1]}
			</span>
		{/if}
	</div>
</div>