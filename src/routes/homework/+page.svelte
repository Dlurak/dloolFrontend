<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import CreateHomework from '$lib/homework/CreateHomework.svelte';
	import { isUserMember } from '$lib/homework/isUserMember';
	import { i } from '@inlang/sdk-js';
	import { onMount } from 'svelte';
	import Filters from '$lib/homework/Filters.svelte';
	import DataBox from '$lib/homework/DataBox.svelte';
	import type { HomeworkResponse } from '../../types/homework';
	import { browser } from '$app/environment';
	import PageSelector from '$lib/homework/pageSelector.svelte';
	import { showHomeworkFilter } from '../stores';

	export let data: HomeworkResponse | undefined;

	let missingSchool = !$page.url.searchParams.get('school');
	let missingClass = !$page.url.searchParams.get('class');

	let schoolInputValue = $page.url.searchParams.get('school') || '';
	let classInputValue = $page.url.searchParams.get('class') || '';

	let showFilters: boolean = true;

	let homeworkAmount = 0;

	let userIsMemberOfClass = false;

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

	const setPage = async (pageNumber: number, postReload = false) => {
		currentPage = pageNumber;
		const newUrl = new URL($page.url);

		newUrl.searchParams.set('page', currentPage.toString());

		await goto(newUrl);
		if (postReload) reload();
		return;
	};

	onMount(async () => {
		reloadIsUserMember();

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
	$: {
		const dataList = data?.data;
		if (dataList) {
			homeworkAmount = dataList.length;
		} else {
			homeworkAmount = 0;
		}
	}

	showHomeworkFilter.subscribe((value) => {
		showFilters = value;
	});
</script>

<svelte:head>
	<title>Dlool | {i('homework')}</title>
</svelte:head>

<div class="grid grid-cols-box-list w-full gap-4">
	{#if showFilters || homeworkAmount === 0}
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
	{/if}

	{#if !missingClass && !missingSchool && data?.status === 'success'}
		{#if userIsMemberOfClass}
			<div class="flex flex-col gap-2">
				{#if !showFilters}
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
				{/if}
				<CreateHomework
					postSubmit={() => {
						reload();
					}}
				/>
			</div>
		{/if}

		{#each data.data as homework, i}
			<div class="flex flex-col gap-2">
				{#if !showFilters && !userIsMemberOfClass && i === 0}
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
				{/if}
				<DataBox
					date={homework.from}
					assignments={homework.assignments}
					id={homework.id}
					postUpdate={reload}
					validUser={userIsMemberOfClass}
					createdAt={homework.createdAt}
				/>
			</div>
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
