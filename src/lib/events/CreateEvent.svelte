<script lang="ts">
	import { PUBLIC_API_URL } from '$env/static/public';
	import SubmitButton from '$lib/SubmitButton.svelte';
	import DateTimePicker from '$lib/dates/DateTimePicker.svelte';
	import Box from '$lib/homework/Box.svelte';
	import NormalInput from '$lib/utils/NormalInput.svelte';
	import { createEventDispatcher } from 'svelte';
	import type { CustomDateTime } from '../../types/customDate';
	import { i } from '@inlang/sdk-js';
	import CommunicationText from '$lib/communicationText.svelte';

	const dispatch = createEventDispatcher();

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

	let errorText = '';
	let successText = '';

	$: disabled =
		!title ||
		!subject ||
		!dateObjStart ||
		!description ||
		!school ||
		!className ||
		!(startTimestamp < endTimestamp);

	$: console.table({
		title,
		subject,
		description,
		school,
		className,
		startTimestamp,
		endTimestamp
	});

	const handleSubmit = (e: SubmitEvent) => {
		e.preventDefault();
		dispatch('preSubmit');

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
		}).then((res) => res.json());

		res.then((dat) => {
			const isError = dat.status === 'error';
			if (isError) {
				disabled = false;
				errorText = i('error');
			} else {
				title = description = subject = location = '';
				successText = i('events.create.success');
				setTimeout(() => {
					successText = '';
				}, 5000);
			}
			dispatch('postSubmit', dat);
		});
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

		<CommunicationText type="success" text={successText} />
		<CommunicationText type="error" text={errorText} />
	</form>
</Box>
