<script lang="ts">
	import Box from './Box.svelte';
	import Input from '$lib/auth/Input.svelte';
	import { loadSchools } from '$lib/auth/loadSchools';
	import SelectDataList from '$lib/auth/SelectDataList.svelte';
	import { loadClasses } from '$lib/auth/loadClasses';
	import SubmitButton from '$lib/SubmitButton.svelte';
	import QuickActionButton from '$lib/QuickActionButton.svelte';
	import { onMount } from 'svelte';
	import { showHomeworkFilter } from '../../routes/stores';
	import I18n from '$lib/I18n.svelte';
	import { i } from '../../languages/i18n';

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
		<h3><I18n key="homework.filters" /></h3>

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
		<I18n>
			<Input
				type="text"
				name={i('school')}
				list="schoolsList"
				bind:value={schoolName}
				autocomplete="off"
			/>
			<Input
				type="text"
				name={i('class')}
				list="classesList"
				bind:value={className}
				autocomplete="off"
			/>
			<SubmitButton
				value={i('homework.filters.apply')}
				onClick={() => {
					onFilterSet(schoolName, className);
				}}
			/>
		</I18n>
		<!--For performace reasons these list are outside of the I18n tag-->
		<SelectDataList id="schoolsList" loadFunction={loadSchools} searchParam={schoolName} />
		<SelectDataList id="classesList" loadFunction={loadClasses} searchParam={schoolName} />
	</div>
</Box>
