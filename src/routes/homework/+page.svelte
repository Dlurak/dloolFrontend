<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import CreateHomework from '$lib/homework/CreateHomework.svelte';
	import { isUserMember } from '$lib/homework/isUserMember';
	import { i } from '@inlang/sdk-js';
	import { onMount } from 'svelte';
	import Filters from '$lib/homework/Filters.svelte';
	import { isLoggedIn } from '$lib/helpers/isLoggedIn';
	import DataBox from '$lib/dates/DataBox.svelte';
	import type { HomeworkResponse } from '../../types/homework';
	import { browser } from '$app/environment';
	import PageSelector from '$lib/homework/pageSelector.svelte';

	export let data: HomeworkResponse | undefined;

	let missingSchool = !$page.url.searchParams.get('school');
	let missingClass = !$page.url.searchParams.get('class');

	let schoolInputValue = $page.url.searchParams.get('school') || '';
	let classInputValue = $page.url.searchParams.get('class') || '';

	let userIsMemberOfClass = false;

	let isLoggedInBool = false;

	const currentPageUrlParamString = $page.url.searchParams.get('page');
	const currentPageUrlParamInt = parseInt(currentPageUrlParamString || '1');
	let currentPage = currentPageUrlParamInt || 1;

	const reload = () => {
		invalidateAll();
		data = data;
		console.log(data);
	};

	const reloadIsUserMember = async () => {
		userIsMemberOfClass = await isUserMember(
			$page.url.searchParams.get('class') as string,
			$page.url.searchParams.get('school') as string
		);
	};

	function setParameters(params: { school: string; class: string }) {
		const newUrl = new URL($page.url);

		newUrl?.searchParams?.set('school', params.school);
		newUrl?.searchParams?.set('class', params.class);

		goto(newUrl).then(() => {
			reload();
			if (browser) {
				localStorage.setItem('school', params.school);
				localStorage.setItem('class', params.class);
			}
			reloadIsUserMember();
		});
	}

	const setPage = async (page: number, postReload = false) => {
		currentPage = page;
		const newUrl = new URL($page.url);

		newUrl?.searchParams?.set('page', page.toString());

		await goto(newUrl);
		if (postReload) reload();
		return;
	};

	onMount(async () => {
		reloadIsUserMember();
		isLoggedInBool = isLoggedIn();

		const schoolLocalStorage = localStorage.getItem('school');
		const classLocalStorage = localStorage.getItem('class');
		const currentSchool = $page.url.searchParams.get('school');
		const currentClass = $page.url.searchParams.get('class');

		const currentlyValid = currentSchool && currentClass;

		await setPage(currentPage);
		if (schoolLocalStorage && classLocalStorage && !currentlyValid) {
			setParameters({
				school: schoolLocalStorage,
				class: classLocalStorage
			});
			schoolInputValue = schoolLocalStorage;
			classInputValue = classLocalStorage;
		}
	});

	$: missingSchool = !$page.url.searchParams.get('school');
	$: missingClass = !$page.url.searchParams.get('class');
</script>

<svelte:head>
	<title>Dlool | {i('homework')}</title>
</svelte:head>

<div class="grid grid-cols-box-list w-full gap-4">
	<Filters
		bind:className={classInputValue}
		bind:schoolName={schoolInputValue}
		onFilterSet={() => {
			setParameters({
				school: schoolInputValue,
				class: classInputValue
			});
		}}
	/>

	{#if !missingClass && !missingSchool && data?.status === 'success'}
		{#if userIsMemberOfClass}
			<CreateHomework
				postSubmit={() => {
					reload();
				}}
			/>
		{/if}

		{#each data.data as homework}
			<DataBox
				date={homework.from}
				assignments={homework.assignments}
				id={homework.id}
				postUpdate={reload}
				validUser={userIsMemberOfClass}
			/>
		{/each}
		{#if data.data.length === 0}
			<p class="flex items-center justify-center text-gray-600 dark:text-gray-400">
				{i('homework.noHomework')}
			</p>
		{:else if data.totalPageCount > 1}
			<PageSelector
				bind:currentPage
				setPageFunction={(pageCount) => setPage(pageCount, true)}
				totalPageCount={data.totalPageCount}
			/>
		{/if}
	{/if}
</div>
