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
	import Input from '$lib/auth/Input.svelte';
	import { loadSchools } from '$lib/auth/loadSchools';
	import SelectDataList from '$lib/auth/SelectDataList.svelte';
	import { loadClasses } from '$lib/auth/loadClasses';
	import SvelteMarkdown from 'svelte-markdown';

	const currentDate = new Date();

	let title = '';
	let content = '';
	let due: CustomDate = createDate(currentDate);
	let visibility: 'private' | 'public' = 'public';

	let schoolName = '';
	let className = '';

	let disabled = true;

	let errorText = '';

	const getClassId = (schoolName: string, className: string) => {
		const url = `${PUBLIC_API_URL}/classes/${schoolName}/${className}`;

		const rawResPromise = fetch(url).then((res) => {
			if (res.ok) {
				return res.json();
			} else {
				return null;
			}
		});

		return rawResPromise.then((rawRes) => {
			const classId = rawRes?.data._id as string;

			if (classId) {
				return classId;
			} else {
				errorText = i('error');
			}
		});
	};

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

<svelte:head>
	<title>Dlool | {i('notes.create.documentTitle')}</title>
</svelte:head>

<div class="flex flex-col gap-5 w-full p-5">
	<div>
		<Input name={i('notes.create.title')} type="text" bind:value={title} />
	</div>
	<div class="flex flex-col md:flex-row gap-3">
		<div class="w-full">
			<textarea
				maxlength="511"
				bind:value={content}
				placeholder={i('notes.create.content')}
				class="rounded-sm w-full h-full outline outline-1 outline-gray-400 p-3"
			/>
		</div>
		<div class="flex flex-col gap-1">
			<DatePicker bind:dateObj={due} />
			<select bind:value={visibility} class="outline outline-1 outline-gray-400 p-3 rounded-sm">
				<option value="public">{i('notes.create.public')}</option>
				<option value="private">{i('notes.create.private')}</option>
			</select>
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
				value={i('notes.create.submit')}
				{disabled}
				onClick={async (e) => {
					e.preventDefault();

					disabled = true;

					const classId = await getClassId(schoolName, className);

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
							class: classId
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
			/>
		</div>
	</div>
</div>

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
