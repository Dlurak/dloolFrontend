<script lang="ts">
	import { PUBLIC_API_URL } from '$env/static/public';
	import I18n from '$lib/I18n.svelte';
	import SubmitButton from '$lib/SubmitButton.svelte';
	import Input from '$lib/auth/Input.svelte';
	import SelectDataList from '$lib/auth/SelectDataList.svelte';
	import { loadClasses } from '$lib/auth/loadClasses';
	import { loadSchools } from '$lib/auth/loadSchools';
	import { addToast } from '$lib/toast/addToast';
	import { i } from '../../languages/i18n';
	import { downloadHomework, type Option, type ResultType } from './downloadHomework';

	const options: Option[] = [
		{
			type: 'text/calendar',
			title: 'iCal',
			fileExtension: 'ics'
		},
		{
			type: 'text/csv',
			title: 'CSV',
			fileExtension: 'csv'
		}
	];

	let resultType: ResultType = 'text/calendar';

	let school = '';
	let className = '';

	let disabled = true;

	$: {
		const schoolIsSelected = school !== '';
		const classNameIsSelected = className !== '';

		disabled = !schoolIsSelected || !classNameIsSelected;
	}
</script>

<section>
	<h2>Download your homework</h2>

	<div class="flex gap-2">
		<I18n>
			<Input
				type="text"
				name={i('school')}
				bind:value={school}
				autocomplete="off"
				list="schoolsList"
			/>
			<Input
				type="text"
				name={i('class')}
				bind:value={className}
				autocomplete="off"
				list="classList"
			/>
		</I18n>

		<SelectDataList id="schoolsList" loadFunction={loadSchools} searchParam={school} />
		<SelectDataList id="classList" loadFunction={loadClasses} searchParam={school} />
	</div>

	<div>
		<select
			class="bg-transparent w-full rounded-md border-2 border-gray-400 px-4 py-2"
			bind:value={resultType}
		>
			{#each options as option}
				<option value={option.type}>{option.title}</option>
			{/each}
		</select>
	</div>

	<SubmitButton
		value="Dowload"
		{disabled}
		onClick={(e) => {
			e.preventDefault();

			downloadHomework(school, className, options, resultType);
		}}
	/>
</section>
