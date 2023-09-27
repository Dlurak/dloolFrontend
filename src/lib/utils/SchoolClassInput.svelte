<script lang="ts">
	import Input from '$lib/auth/Input.svelte';
	import SelectDataList from '$lib/auth/SelectDataList.svelte';
	import { loadClasses } from '$lib/auth/loadClasses';
	import { loadSchools } from '$lib/auth/loadSchools';
	import { i } from '@inlang/sdk-js';

	export let value = '';
	export const tooltip = '';
	export const searchParam: string = '';
	export let type: 'school' | 'class';

	const isSchool = type === 'school';
	const loadFunction = isSchool ? loadSchools : loadClasses;
	const name = i(type);
</script>

<Input type="text" {name} list="list" autocomplete="off" bind:value {tooltip} />
<SelectDataList id="list" {loadFunction} {searchParam} />
