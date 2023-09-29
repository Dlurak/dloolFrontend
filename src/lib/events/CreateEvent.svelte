<script lang="ts">
	import { PUBLIC_API_URL } from '$env/static/public';
	import SubmitButton from '$lib/SubmitButton.svelte';
	import DateTimePicker from '$lib/dates/DateTimePicker.svelte';
	import Box from '$lib/homework/Box.svelte';
	import NormalInput from '$lib/utils/NormalInput.svelte';
	import type { CustomDateTime } from '../../types/customDate';

	export let school = '';
	export let className = '';

	let disabled = true;
	let title = '';
	let subject = '';
	let dateObjStart: CustomDateTime;
	let description = '';
	let location = '';

	let startTimestamp: number;
	let endTimestamp: number;

	$: disabled =
		!title ||
		!subject ||
		!dateObjStart ||
		!description ||
		!school ||
		!className ||
		!(startTimestamp < endTimestamp);

	const handleSubmit = (e: SubmitEvent) => {
		e.preventDefault();
		const durationMilliSeconds = endTimestamp - startTimestamp;
		const durationSeconds = durationMilliSeconds / 1000;

		const eventObj: any = {
			title,
			description,
			date: dateObjStart,
			duration: durationSeconds,
			subject,
			school,
			class: className
		};
		const isLocation = !!location;
		if (isLocation) eventObj.location = location;

		const token = localStorage.getItem('token') as string;
		const res = fetch(`${PUBLIC_API_URL}/events`, {
			method: 'POST',
			body: JSON.stringify(eventObj),
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json'
			}
		});

		console.log(res);
		res.then(console.log);
	};
</script>

<Box>
	<form class="flex flex-col gap-2" on:submit={handleSubmit}>
		<h3 class="grid grid-cols-1 md:grid-cols-2 gap-2">
			<NormalInput bind:value={title} placeholder="Titel" />
			<NormalInput bind:value={subject} placeholder="Fach" />
		</h3>
		<NormalInput type="textarea" bind:value={description} placeholder="Beschreibung" />

		<NormalInput bind:value={location} placeholder="Location" />

		<DateTimePicker bind:dateObj={dateObjStart} bind:timestamp={startTimestamp} />
		<DateTimePicker bind:timestamp={endTimestamp} />

		<SubmitButton {disabled} value="Submit" />
	</form>
</Box>
