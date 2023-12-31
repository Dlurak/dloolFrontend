<script lang="ts">
	import SubmitButton from '$lib/SubmitButton.svelte';
	import DateTimePicker from '$lib/dates/EndStartDateTiimePicker.svelte';
	import Box from '$lib/homework/Box.svelte';
	import NormalInput from '$lib/utils/NormalInput.svelte';
	import { createEventDispatcher } from 'svelte';
	import { createDateTime } from '$lib/dates/createDateObject';
	import I18n from '$lib/I18n.svelte';
	import { i } from '../../languages/i18n';
	import { subjectsSortetCapitalized } from '../../constants/subjecticons';
	import type { CustomDateTime } from '../../types/customDate';
	import { addToast } from '$lib/toast/addToast';
	import { backendUrl } from '$lib/../stores';

	const dispatch = createEventDispatcher();

	export let school = '';
	export let className = '';

	let disabled = true;
	let title = '';
	let subject = '';
	let description = '';
	let location = '';

	let startDate = new Date();
	let endDate = new Date();
	let endDateIsAfterStartDate = false;

	$: disabled = !title || !subject || !startDate || !description || !endDateIsAfterStartDate;

	const handleSubmit = (e: SubmitEvent) => {
		e.preventDefault();
		dispatch('preSubmit');

		const durationMilliSeconds = endDate.getTime() - startDate.getTime();
		const durationSeconds = durationMilliSeconds / 1000;

		const eventObj: Record<string, string | number | CustomDateTime> = {
			title,
			description,
			date: createDateTime(startDate),
			duration: durationSeconds,
			subject,
			school,
			class: className
		};
		const isLocation = !!location;
		if (isLocation) eventObj.location = location;

		const token = localStorage.getItem('token') as string;
		const res = fetch(`${$backendUrl}/events`, {
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
				addToast({
					type: 'error',
					content: 'error',
					duration: 5000
				});
			} else {
				title = description = subject = location = '';
				addToast({
					type: 'success',
					content: 'events.create.success',

					duration: 5000
				});
			}
			dispatch('postSubmit', dat);
		});
	};
</script>

<Box>
	<form class="flex flex-col gap-2 w-full" on:submit={handleSubmit}>
		<I18n>
			<h3 class="grid grid-cols-1 @md:grid-cols-2 gap-2">
				<NormalInput bind:value={title} placeholder={i('events.create.title')} />
				<NormalInput
					bind:value={subject}
					placeholder={i('events.create.subject')}
					list="subjectList"
				/>
			</h3>
			<NormalInput
				type="textarea"
				bind:value={description}
				placeholder={i('events.create.description')}
			/>
		</I18n>

		<datalist id="subjectList">
			{#each subjectsSortetCapitalized as subj}
				<option value={subj} />
			{/each}
		</datalist>

		<span class="flex items-center gap-1">
			<i class="bx bx-map" />
			<I18n>
				<NormalInput bind:value={location} placeholder={i('events.create.location')} />
			</I18n>
		</span>

		<DateTimePicker bind:startDate bind:endDate bind:endDateIsAfterStartDate />

		<I18n>
			<SubmitButton {disabled} value={i('events.create.submit')} />
		</I18n>
	</form>
</Box>
