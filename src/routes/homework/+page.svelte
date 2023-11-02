<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import CreateHomework from '$lib/homework/CreateHomework.svelte';
	import { isUserMember } from '$lib/homework/isUserMember';
	import { onDestroy, onMount } from 'svelte';
	import Filters from '$lib/homework/Filters.svelte';
	import DataBox from '$lib/homework/DataBox.svelte';
	import { browser } from '$app/environment';
	import PageSelector from '$lib/homework/pageSelector.svelte';
	import { backendUrl, showHomeworkFilter, title } from '../../stores';
	import I18n from '$lib/I18n.svelte';
	import { addToast } from '$lib/toast/addToast';
	import { loadHomework } from './loadData';
	import Loader from '$lib/Loader.svelte';
	import { i } from '../../languages/i18n';

	let state: 'loading' | 'loaded' | 'error' = 'loading';
	let len = 0;
	let dataPromise = loadHomework().then((data) => {
		state = 'loaded';
		len = data?.data?.length || 0;
		return data;
	});

	let missingSchool = !$page.url.searchParams.get('school');
	let missingClass = !$page.url.searchParams.get('class');

	let schoolInputValue = $page.url.searchParams.get('school') || '';
	let classInputValue = $page.url.searchParams.get('class') || '';

	let showFilters = true;

	let userIsMemberOfClass = false;

	const currentPageUrlParamString = $page.url.searchParams.get('page');
	const currentPageUrlParamInt = parseInt(currentPageUrlParamString || '1');
	let currentPage = currentPageUrlParamInt || 1;

	const reload = () => {
		dataPromise = loadHomework().then((data) => {
			state = 'loaded';
			len = data?.data?.length || 0;
			return data;
		});
	};

	const reloadIsUserMember = async () => {
		userIsMemberOfClass = isUserMember(
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

	const userIsMemberInterval = setInterval(() => {
		reloadIsUserMember();
	}, 1000);

	title.set('homework');

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

	onDestroy(() => {
		clearInterval(userIsMemberInterval);
	});

	$: missingSchool = !$page.url.searchParams.get('school');
	$: missingClass = !$page.url.searchParams.get('class');

	showHomeworkFilter.subscribe((value) => {
		showFilters = value;
	});

	backendUrl.subscribe(() => reload());
</script>

<div class="flex w-full h-full flex-col gap-2">
	<div class="w-full">
		{#await dataPromise then data}
			{#if data?.data.length}
				<I18n>{i('homework.amount', { amount: `${data?.data.length}` })}</I18n>
			{/if}
		{/await}
	</div>

	<div class="grid grid-cols-box-list w-full gap-4">
		{#if showFilters || state === 'loading' || state === 'error' || len === 0}
			<Filters
				bind:className={classInputValue}
				bind:schoolName={schoolInputValue}
				onFilterSet={() => {
					addToast({
						type: 'info',
						content: 'toast.homework.filterSet',
						duration: 5000
					});
					setParameters({
						school: schoolInputValue,
						class: classInputValue
					});
				}}
			/>
		{/if}

		{#await dataPromise}
			<div class="flex justify-center items-center">
				<Loader type="circle" />
			</div>
		{:then data}
			{#if !missingClass && !missingSchool && data?.status === 'success'}
				{#if userIsMemberOfClass}
					<div class="flex flex-col gap-2">
						{#if !showFilters}
							<Filters
								bind:className={classInputValue}
								bind:schoolName={schoolInputValue}
								onFilterSet={() => {
									addToast({
										type: 'info',
										content: 'toast.homework.filterSet',
										duration: 5000
									});
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
									addToast({
										type: 'info',
										content: 'toast.homework.filterSet',
										duration: 5000
									});
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
							creatorId={homework.creator}
						/>
					</div>
				{/each}
				{#if data.data.length === 0}
					<p class="flex items-center justify-center text-gray-600 dark:text-gray-400">
						<I18n key="homework.noHomework" />
					</p>
				{:else if data.totalPageCount > 1}
					<PageSelector
						bind:currentPage
						setPageFunction={(pageCount) => setPage(pageCount, true)}
						totalPageCount={data.totalPageCount}
					/>
				{/if}
			{/if}
		{/await}
	</div>
</div>
