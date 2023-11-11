<script>
	import './Docs.css';
	import { page } from '$app/stores';
	import I18n from '$lib/I18n.svelte';

	/**
	 * @type {{name: string, link: string} | string | undefined}
	 */
	export let author;
	/**
	 * @type {string | undefined}
	 */
	export let title;

	let currentUrl = $page.route.id?.split('/').slice(1).join('/');
	page.subscribe((value) => {
		currentUrl = value.route.id?.split('/').slice(1).join('/');
	});
</script>

<svelte:head>
	<title>Dlool | Documentation{title ? ` | ${title}` : ''}</title>
</svelte:head>

<div id="wrapper">
	<slot />
</div>

<div class="flex justify-between items-center pt-6">
	{#if typeof author === 'string'}
		<span>
			<i class="bx bx-user" />
			{author}
		</span>
	{:else if author}
		<a href={author.link}>
			<i class="bx bx-user" />
			{author.name}
		</a>
	{/if}

	<a href="https://github.com/Dlurak/dloolFrontend/blob/Main/src/routes/{currentUrl}/%2Bpage.md">
		<i class="bx bxl-github" />
		<I18n key="documentation.editOnGitHub" />
	</a>
</div>
