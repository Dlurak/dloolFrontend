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

	export let data: HomeworkResponse | undefined;

	let missingSchool = !$page.url.searchParams.get('school');
	let missingClass = !$page.url.searchParams.get('class');

	let schoolInputValue = $page.url.searchParams.get('school') || '';
	let classInputValue = $page.url.searchParams.get('class') || '';

	let userIsMemberOfClass = false;

	let isLoggedInBool = false;

	const reload = () => {
		invalidateAll();
		data = data;
	};

	function setParameters(params: { school: string; class: string }) {
		const newUrl = new URL($page.url);

		newUrl?.searchParams?.set('school', params.school);
		newUrl?.searchParams?.set('class', params.class);

		goto(newUrl).then(() => {
			reload();
		});
	}

	onMount(async () => {
		userIsMemberOfClass = await isUserMember(
			$page.url.searchParams.get('class') as string,
			$page.url.searchParams.get('school') as string
		);

		isLoggedInBool = isLoggedIn();
	});
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
		{#if isLoggedInBool && userIsMemberOfClass}
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
			/>
		{/each}
	{/if}
</div>
