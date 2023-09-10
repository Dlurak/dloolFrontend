<script lang="ts">
	import { PUBLIC_API_URL } from '$env/static/public';
	import CentralFormBox from '$lib/CentralFormBox.svelte';
	import SubmitButton from '$lib/SubmitButton.svelte';
	import DatePicker from '$lib/dates/DatePicker.svelte';
	import { createDate } from '$lib/dates/createDateObject';
	import { isLoggedIn } from '$lib/helpers/isLoggedIn';
	import { i } from '@inlang/sdk-js';
	import type { CustomDate } from '../../../types/customDate';
	import { onMount } from 'svelte';

	const currentDate = new Date();

	let title = '';
	let content = '';
	let due: CustomDate = createDate(currentDate);
	let visibility: 'private' | 'public' = 'public';
	let classObjId: string | null = null;

	let disabled = true;

	let errorText = '';

	onMount(() => {
		if (!isLoggedIn()) {
			window.location.href = '/login?redirect=/notes/new';
		}
	});

	$: {
		const isTitleValid = title.length > 0 && title.length < 64;
		const isContentValid = content.length > 0 && content.length < 512;

		disabled = !isTitleValid || !isContentValid;
	}
</script>

<CentralFormBox
	{errorText}
	onSubmit={(e) => {
		e.preventDefault();
		disabled = true;
		const url = `${PUBLIC_API_URL}/notes`;

		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				title,
				content,
				due,
				visibility,
				class: classObjId
			})
		}).then((res) => {
			if (res.ok) {
				window.location.href = '/notes';
			} else {
				errorText = i('error');
				disabled = false;
			}
		});
	}}
>
	<div class="flex flex-col gap-5">
		<textarea
			maxlength="63"
			bind:value={title}
			placeholder={i('notes.create.title')}
			class="rounded-sm"
		/>
		<textarea
			maxlength="511"
			bind:value={content}
			placeholder={i('notes.create.content')}
			class="rounded-sm"
		/>
		<DatePicker bind:dateObj={due} />
		<select bind:value={visibility} class="outline outline-1 outline-gray-400 p-3 rounded-sm">
			<option value="public">{i('notes.create.public')}</option>
			<option value="private">{i('notes.create.private')}</option>
		</select>
		<SubmitButton value={i('notes.create.submit')} {disabled} />
	</div>
</CentralFormBox>

<style>
	textarea,
	select {
		color: var(--text);
		background-color: transparent;
	}

	:is(textarea, select):focus-visible {
		outline: 2px solid var(--accent);
	}
</style>
