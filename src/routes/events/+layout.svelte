<script lang="ts">
	import CreateEvent from '$lib/events/CreateEvent.svelte';
	import EventBox from '$lib/events/EventBox.svelte';
	import type { EventResponse } from '../../types/events';

	export let data: EventResponse | { eventDataAvailable: false };
</script>

<div class="w-full md:grid md:grid-cols-[1fr,2fr] gap-2 parent">
	<div class="w-full h-full md:flex overflow-y-scroll flex flex-col gap-2 items-stretch">
		{#if data.eventDataAvailable}
			<ul class="flex flex-col gap-2 items-stretch w-full">
				<li>
					<CreateEvent />
				</li>
				{#each data.data.events as event}
					<li>
						<EventBox {event} />
					</li>
				{/each}
			</ul>
			{#if data.data.events.length === 0}
				<p class="text-center">There are no events to show you :/</p>
			{/if}
		{/if}
	</div>

	<div class="md:flex hidden flex-col overflow-y-scroll">
		<slot />
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
