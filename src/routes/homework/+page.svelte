<script lang="ts">
	import { browser } from '$app/environment';
	import { goto, invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import LoginInput from '$lib/LoginInput.svelte';
	import SubmitButton from '$lib/SubmitButton.svelte';
	import { getWeekdayByDate } from '$lib/dataWeekday';
	import CreateHomework from '$lib/homework/CreateHomework.svelte';
	import { i } from '@inlang/sdk-js';
	import { onMount } from 'svelte';

	export let data: any;

	let missingSchool = !$page.url.searchParams.get('school');
	let missingClass = !$page.url.searchParams.get('class');

	let schoolInputValue = $page.url.searchParams.get('school') || '';
	let classInputValue = $page.url.searchParams.get('class') || '';

	let tokenExpires = 0;

	function setParameter(param: 'school' | 'class', value: string) {
		const newUrl = new URL($page.url);
		newUrl?.searchParams?.set(param, value);
		goto(newUrl);
	}

	onMount(() => {
		tokenExpires = Number(localStorage.getItem('tokenExpires'));
	});
</script>

<div id="wrapper">
	<div class="box">
		<h3>Filters</h3>

		<div class="filter-row">
			<LoginInput type="text" name={i('school')} bind:value={schoolInputValue} />
			<SubmitButton
				value={i('filter.apply')}
				onClick={() => setParameter('school', schoolInputValue)}
			/>
		</div>

		<div class="filter-row">
			<LoginInput type="text" name={i('class')} bind:value={classInputValue} />
			<SubmitButton
				value={i('filter.apply')}
				onClick={() => setParameter('class', classInputValue)}
			/>
		</div>
	</div>

	{#if !missingClass && !missingSchool && data.status === 'success'}
		{#if new Date().getTime() < tokenExpires}
			<CreateHomework
				preSubmit={() => {
					invalidateAll();
				}}
			/>
		{/if}

		{#each data.data as homework}
			<div class="box">
				<h3 class="date">
					{getWeekdayByDate(homework.from)}
					{homework.from.day}.{homework.from.month}.{homework.from.year}
				</h3>

				<ul class="assignmentList">
					{#each homework.assignments as assignment}
						<li>
							<span class="assignments-firstrow">
								<h4>{assignment.subject}</h4>
								<p>
									{getWeekdayByDate(assignment.due)}
									{assignment.due.day}.{assignment.due.month}.{assignment.due.year}
								</p>
							</span>
							<p class="description">{assignment.description}</p>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	{/if}
</div>

<style>
	#wrapper {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
		width: 100%;
		gap: 2rem;
	}

	.box {
		padding: 1rem;
		border-radius: 1rem;
		background-color: var(--bg);
	}

	.assignmentList {
		list-style-type: none;
		padding: 0;
	}

	.assignments-firstrow {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: start;
		gap: 0.5rem;
	}

	.assignments-firstrow * {
		margin-block: 0.6rem;
	}

	.description {
		margin-block: 0.5rem;
	}

	.filter-row {
		display: grid;
		grid-template-columns: 2fr 1fr;
		gap: 0.5rem;
	}
</style>
