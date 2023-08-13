<script lang="ts">
	import { i } from '@inlang/sdk-js';
	import Box from './Box.svelte';
	import Input from '$lib/auth/Input.svelte';
	import { loadSchools } from '$lib/auth/loadSchools';
	import SelectDataList from '$lib/auth/SelectDataList.svelte';
	import { loadClasses } from '$lib/auth/loadClasses';
	import SubmitButton from '$lib/SubmitButton.svelte';

	export let schoolName = '';
	export let className = '';

	export let onFilterSet: (school: string, className: string) => void;
</script>

<Box>
	<h3>{i('homework.filters')}</h3>

	<Input type="text" name={i('school')} list="schoolsList" bind:value={schoolName} />
	<SelectDataList id="schoolsList" loadFunction={loadSchools} searchParam={schoolName} />

	<Input type="text" name={i('class')} list="classesList" bind:value={className} />
	<SelectDataList id="classesList" loadFunction={loadClasses} searchParam={schoolName} />

	<SubmitButton
		value={i('homework.filters.apply')}
		onClick={() => {
			onFilterSet(schoolName, className);
		}}
	/>
</Box>
