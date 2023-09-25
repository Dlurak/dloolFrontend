<script lang="ts">
	import EventBox from '$lib/events/EventBox.svelte';
	import type { EventResponse } from '../../types/events';

	export let data: EventResponse | { eventDataAvailable: false };
</script>

<div class="w-full md:grid md:grid-cols-[1fr,2fr] gap-2 parent">
	<div class="w-full h-full md:flex overflow-scroll">
		{#if data.eventDataAvailable}
			<ul class="flex flex-col gap-2 items-stretch w-full">
				{#if data.data.events.length === 0}
					<p class="text-center">There are no events to show you :/</p>
				{/if}
				{#each data.data.events as event}
					<li>
						<EventBox {event} />
					</li>
				{/each}
			</ul>
		{/if}
	</div>

	<div class="md:flex flex-col overflow-y-scroll">
		<slot />
	</div>
</div>
