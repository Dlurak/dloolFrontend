<script lang="ts">
	import { i } from '@inlang/sdk-js';
	import Box from './Box.svelte';
	import Input from '$lib/auth/Input.svelte';
	import { loadSchools } from '$lib/auth/loadSchools';
	import SelectDataList from '$lib/auth/SelectDataList.svelte';
	import { loadClasses } from '$lib/auth/loadClasses';
	import SubmitButton from '$lib/SubmitButton.svelte';
	import QuickActionButton from '$lib/QuickActionButton.svelte';
	import { onMount } from 'svelte';
	import { showHomeworkFilter } from '../../routes/stores';

	export let schoolName = '';
	export let className = '';

	export let showFilters = true;

	export let onFilterSet: (school: string, className: string) => void;

	onMount(() => {
		const showFiltersString = localStorage.getItem('showFilters');
		if (showFiltersString) {
			showFilters = JSON.parse(showFiltersString);
			showHomeworkFilter.set(showFilters);
		}
	});
</script>

<Box hideOnPrint>
	<span class="flex flex-row justify-between items-center">
		<h3>{i('homework.filters')}</h3>

		<QuickActionButton
			iconName="bx-chevron-down"
			focusedIconName="bx-chevron-down-square"
			on:click={() => {
				showFilters = !showFilters;
				localStorage.setItem('showFilters', JSON.stringify(showFilters));
				showHomeworkFilter.set(showFilters);
			}}
		/>
	</span>

	<div class:hidden={!showFilters}>
		<Input
			type="text"
			name={i('school')}
			list="schoolsList"
			bind:value={schoolName}
			autocomplete="off"
		/>
		<SelectDataList id="schoolsList" loadFunction={loadSchools} searchParam={schoolName} />
		<Input
			type="text"
			name={i('class')}
			list="classesList"
			bind:value={className}
			autocomplete="off"
		/>
		<SelectDataList id="classesList" loadFunction={loadClasses} searchParam={schoolName} />
		<SubmitButton
			value={i('homework.filters.apply')}
			onClick={() => {
				onFilterSet(schoolName, className);
			}}
		/>
	</div>
</Box>
