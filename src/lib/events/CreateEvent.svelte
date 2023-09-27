<script lang="ts">
	import SubmitButton from '$lib/SubmitButton.svelte';
	import DateTimePicker from '$lib/dates/DateTimePicker.svelte';
	import Box from '$lib/homework/Box.svelte';
	import NormalInput from '$lib/utils/NormalInput.svelte';
	import SchoolClassInput from '$lib/utils/SchoolClassInput.svelte';
	import type { CustomDateTime } from '../../types/customDate';

	let disabled = true;
	let titel = '';
	let subject = '';
	let dateObj: CustomDateTime;
	let description = '';
	let school = '';
	let className = '';
	let location = '';

	$: disabled = !titel || !subject || !dateObj || !description || !school || !className;
</script>

<Box>
	<div class="flex flex-col gap-2">
		<h3 class="grid grid-cols-1 md:grid-cols-2 gap-2">
			<NormalInput bind:value={titel} placeholder="Titel" />
			<NormalInput bind:value={subject} placeholder="Fach" />
		</h3>
		<NormalInput type="textarea" bind:value={description} placeholder="Beschreibung" />

		<div class="grid grid-cols-1 md:grid-cols-2 gap-2">
			<SchoolClassInput type="school" bind:value={school} searchParam={school} />
			<SchoolClassInput type="class" searchParam={school} bind:value={className} />
		</div>
		<NormalInput bind:value={location} placeholder="Location" />
		<DateTimePicker bind:dateObj />
		<SubmitButton {disabled} value="Not working yet" />
	</div>
</Box>
