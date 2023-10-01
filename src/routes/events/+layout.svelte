<script lang="ts">
	import CreateEvent from '$lib/events/CreateEvent.svelte';
	import EventBox from '$lib/events/EventBox.svelte';
	import { onDestroy, onMount } from 'svelte';
	import type { EventResponse } from '../../types/events';
	import { isLoggedIn } from '$lib/helpers/isLoggedIn';
	import { browser } from '$app/environment';
	import Filters from '$lib/homework/Filters.svelte';
	import { page } from '$app/stores';
	import { goto, invalidateAll } from '$app/navigation';

	export let data: EventResponse | { eventDataAvailable: false };

	let loggedIn = false;

	const interval = setInterval(() => {
		if (browser) loggedIn = isLoggedIn();
	}, 2000);

	let school = '';
	let className = '';

	let filteredSchool = '';
	let filteredClassName = '';

	const reload = () => {
		const url = new URL(location.href);
		url.searchParams.set('school', filteredSchool);
		url.searchParams.set('class', filteredClassName);

		goto(url).then(() => {
			invalidateAll();
			data = data;
		});
	};

	onMount(() => {
		// TODO: Refactor this into the Filters component
		const schoolLocalStorage = localStorage.getItem('school');
		const classLocalStorage = localStorage.getItem('class');
		const currentSchool = $page.url.searchParams.get('school');
		const currentClass = $page.url.searchParams.get('class');

		const currentlyValid = !!(currentSchool && currentClass);
		if (schoolLocalStorage && classLocalStorage && !currentlyValid) {
			filteredSchool = schoolLocalStorage;
			filteredClassName = classLocalStorage;

			reload();
		}

		if (schoolLocalStorage) school = schoolLocalStorage;
		if (classLocalStorage) className = classLocalStorage;
	});

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<div class="w-full md:grid md:grid-cols-[1fr,2fr] gap-2 parent">
	<div class="w-full h-full md:flex overflow-y-scroll flex flex-col gap-2 items-stretch">
		<ul class="flex flex-col gap-2 items-stretch w-full">
			<li>
				<Filters
					bind:className
					bind:schoolName={school}
					onFilterSet={() => {
						filteredSchool = school;
						filteredClassName = className;

						reload();
						if (browser) {
							localStorage.setItem('school', filteredSchool);
							localStorage.setItem('class', filteredClassName);
						}
					}}
				/>
			</li>
			{#if data.eventDataAvailable}
				{#if loggedIn}
					<li>
						<CreateEvent
							className={filteredClassName}
							school={filteredSchool}
							on:postSubmit={reload}
						/>
					</li>
				{/if}
				{#each data.data.events as event}
					<li>
						<EventBox {event} />
					</li>
				{/each}
			{/if}
		</ul>
		{#if !data.eventDataAvailable || data.data.events.length === 0}
			<p class="text-center">There are no events to show you :/</p>
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
