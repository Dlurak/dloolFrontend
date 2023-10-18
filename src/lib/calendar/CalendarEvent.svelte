<script lang="ts">
	import Modal from '$lib/Modal.svelte';
	import EventBoxInner from '$lib/events/EventBoxInner.svelte';
	import type { Event } from '../../types/events';
	import { isEventOver } from '$lib/events/isEventOver';

	export let event: Event;

	let modalIsOpened = false;
</script>

<button
	class="rounded-sm bg-light-box dark:bg-dark-box px-2 py-1 text-start"
	class:opacity-50={isEventOver(event)}
	on:click={() => (modalIsOpened = !modalIsOpened)}
>
	<h4 class="line-clamp-1">{event.title}</h4>
	<p class="line-clamp-3 whitespace-pre-line">{event.description}</p>
</button>

<Modal bind:open={modalIsOpened} title={event.title}>
	<EventBoxInner {event} showTitle={false} />
</Modal>
