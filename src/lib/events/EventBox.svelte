<script lang="ts">
	import Box from '$lib/homework/Box.svelte';
	import { page } from '$app/stores';
	import type { Event } from '../../types/events';
	import QuickActionButton from '$lib/QuickActionButton.svelte';
	import { onMount } from 'svelte';
	import EventBoxInner from './EventBoxInner.svelte';
	import Modal from '$lib/Modal.svelte';
	import { isEventOver } from './isEventOver';
	import { subjectColors } from '../../routes/stores';
	import { rgbToHex } from '$lib/colors/hexToRgb';

	export let event: Event;

	let modalIsOpened = false;

	let shareEnabled = false;

	let color = $subjectColors.find(
		(color) => color.subject.toLowerCase() === event.subject.toLowerCase()
	)?.color;

	onMount(() => {
		shareEnabled = !!navigator.share;
	});
</script>

<Box id={event._id} secondary={isEventOver(event)}>
	<div class="flex gap-1">
		{#if color}
			<div class="py-1 w-1">
				<div
					style="--color: {rgbToHex(color.r, color.g, color.b)}"
					class="bg-[var(--color)] h-full w-full rounded-full"
				/>
			</div>
		{/if}
		<div class="w-full">
			<EventBoxInner {event} />
		</div>
	</div>

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

<Modal bind:open={modalIsOpened} title={event.title}>
	<EventBoxInner {event} showTitle={false} />
</Modal>
