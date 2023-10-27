<script lang="ts">
	import { page } from '$app/stores';
	import I18n from '$lib/I18n.svelte';
	import QuickActionButton from '$lib/QuickActionButton.svelte';
	import { i } from '../../languages/i18n';

	const links = [
		{
			name: 'settings.account',
			uri: '/account',
			'box-icon': 'bx-user'
		},
		'hr',
		{
			name: 'settings.preferences',
			uri: '/preferences',
			'box-icon': 'bx-cog'
		},
		{
			name: 'settings.colors',
			uri: '/colors',
			'box-icon': 'bx-palette'
		}
	] as const;

	let isSubpage = false;

	$: isSubpage = $page.url.pathname !== '/settings';
</script>

<div class="w-full grid md:grid-cols-[1fr,2fr] gap-2 grid-cols-1">
	<ul class="flex flex-col gap-2 w-full px-3 md:flex" class:hidden={isSubpage}>
		{#each links as link}
			{#if link === 'hr'}
				<hr class="border-gray-400 rounded-full" />
			{:else}
				<li
					class="rounded-sm px-2 py-1 hover:bg-light-box dark:hover:bg-dark-box focus-within:bg-light-box dark:focus-within:bg-dark-box"
				>
					<a
						href="/settings{link.uri}"
						class="w-full h-full focus:outline-none text-light-text dark:text-dark-text hover:underline focus:underline flex items-center gap-1"
					>
						<i class="bx {link['box-icon']}" />
						<I18n>
							{i(link.name, {}, { transform: 'capitalize' })}
						</I18n>
					</a>
				</li>
			{/if}
		{/each}
	</ul>
	<div class="w-full flex md:flex gap-2" class:hidden={!isSubpage}>
		<!--Vertical Line-->
		<div class="hidden md:block w-[1px] h-full bg-gray-400" />
		<div class="w-full">
			{#if isSubpage}
				<div class="block md:hidden">
					<QuickActionButton
						iconName="bx-arrow-back"
						on:click={() => {
							history.back();
						}}
					/>
				</div>
			{/if}
			<slot />
		</div>
	</div>
</div>
