<script lang="ts">
	import I18n from '$lib/I18n.svelte';
	import TimeAgo from '$lib/dates/TimeAgo.svelte';
	import { getIconForSubject, iconExistsForSubject } from '../../constants/subjecticons';
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
	<span
		class="flex items-center gap-2"
		class:justify-end={showTitle}
		class:justify-start={!showTitle}
	>
		{#if iconExistsForSubject(event.subject.toLowerCase())}
			<i class="bx {getIconForSubject(event.subject.toLowerCase())}" />
		{/if}
		<h3>
			{event.subject}
		</h3>
	</span>
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
			<I18n key="events.created.by" parts={{ name: event.editors[0] }} />
		</span>
		{#if hasMultipleVersions}
			<span class="text-sm text-gray-600 dark:text-gray-300">
				<I18n key="events.edited.by" parts={{ name: event.editors[editorLength - 1] }} />
			</span>
		{/if}
	</div>
</div>
