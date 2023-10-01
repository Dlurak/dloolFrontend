<script lang="ts">
	import TimeAgo from '$lib/dates/TimeAgo.svelte';
	import Box from '$lib/homework/Box.svelte';
	import { page } from '$app/stores';
	import type { Event } from '../../types/events';
	import QuickActionButton from '$lib/QuickActionButton.svelte';
	import { onMount } from 'svelte';
	import EventBoxInner from './EventBoxInner.svelte';
	import Modal from '$lib/Modal.svelte';

	export let event: Event;

	let modalIsOpened = false;

	let shareEnabled = false;

	onMount(() => {
		shareEnabled = !!navigator.share;
	});
</script>

<Box id={event._id}>
	<EventBoxInner {event} />

	<div class="w-full flex flex-row items-center justify-evenly">
		{#if shareEnabled}
			<QuickActionButton
				iconName="bx-share-alt"
				focusedIconName="bxs-share-alt"
				color="text-green-500 dark:text-green-600"
				on:click={() => {
					const shareUrl = $page.url.toString() + `#${event._id}`;
					try {
						navigator.share({
							title: 'Dlool',
							text: 'Check out this event!',
							url: shareUrl
						});
						return;
					} catch (e) {
						return;
					}
				}}
			/>
		{/if}
		<QuickActionButton
			iconName="bx-window-open"
			on:click={() => (modalIsOpened = !modalIsOpened)}
		/>
	</div>
</Box>

<Modal bind:open={modalIsOpened}>
	<EventBoxInner {event} />
</Modal>
