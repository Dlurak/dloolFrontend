<script lang="ts">
	import { PUBLIC_API_URL } from '$env/static/public';
	import SubmitButton from '$lib/SubmitButton.svelte';
	import DatePicker from '$lib/dates/DatePicker.svelte';
	import { createDate } from '$lib/dates/createDateObject';
	import { isLoggedIn } from '$lib/helpers/isLoggedIn';
	import type { CustomDate } from '../../../types/customDate';
	import { onMount } from 'svelte';
	import Input from '$lib/auth/Input.svelte';
	import { loadSchools } from '$lib/auth/loadSchools';
	import SelectDataList from '$lib/auth/SelectDataList.svelte';
	import { loadClasses } from '$lib/auth/loadClasses';
	import I18n from '$lib/I18n.svelte';
	import { i } from '../../../languages/i18n';
	import { title } from '../../stores';

	const currentDate = new Date();

	let titleString = '';
	let content = '';
	let due: CustomDate = createDate(currentDate);
	let visibility: 'private' | 'public' = 'public';

	let schoolName = '';
	let className = '';

	let disabled = true;

	title.set('notes.create.documentTitle');

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
			}
		});
	};

	onMount(() => {
		if (!isLoggedIn()) {
			window.location.href = '/login?redirect=/notes/new';
		}
	});

	$: {
		const isTitleValid = titleString.length > 0 && titleString.length < 64;
		const isContentValid = content.length > 0 && content.length < 512;

		disabled = !isTitleValid || !isContentValid;
	}
</script>

<div class="flex flex-col gap-5 w-full p-5">
	<div>
		<I18n>
			<Input name={i('notes.create.title')} type="text" bind:value={titleString} />
		</I18n>
	</div>
	<div class="flex flex-col md:flex-row gap-3">
		<div class="w-full">
			<I18n>
				<textarea
					maxlength="511"
					bind:value={content}
					placeholder={i('notes.create.content')}
					class="rounded-sm w-full h-full outline outline-1 outline-gray-400 p-3"
				/>
			</I18n>
		</div>
		<div class="flex flex-col gap-1">
			<DatePicker bind:dateObj={due} />
			<select bind:value={visibility} class="outline outline-1 outline-gray-400 p-3 rounded-sm">
				<option value="public"><I18n key="notes.create.public" /></option>
				<option value="private"><I18n key="notes.create.private" /></option>
			</select>
			<I18n>
				<Input
					type="text"
					name={i('school')}
					list="schoolsList"
					bind:value={schoolName}
					autocomplete="off"
				/>
			</I18n>
			<SelectDataList id="schoolsList" loadFunction={loadSchools} searchParam={schoolName} />

			<I18n>
				<Input
					type="text"
					name={i('class')}
					list="classesList"
					bind:value={className}
					autocomplete="off"
				/>
			</I18n>
			<SelectDataList id="classesList" loadFunction={loadClasses} searchParam={schoolName} />

			<I18n>
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
								title: titleString,
								content,
								due,
								visibility,
								class: classId
							})
						}).then((res) => {
							if (res.ok) {
								window.location.href = '/notes';
							} else {
								disabled = false;
							}
						});
					}}
				/></I18n
			>
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
