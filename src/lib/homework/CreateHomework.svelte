<script lang="ts">
	import DatePicker from '../dates/DatePicker.svelte';

	import { page } from '$app/stores';
	import { PUBLIC_API_URL } from '$env/static/public';
	import SubmitButton from '$lib/SubmitButton.svelte';
	import { i } from '@inlang/sdk-js';
	import { createDate } from '$lib/dates/createDateObject';
	import { getDateInInputFormat } from '$lib/dates/getDateInInputFormat';
	import Box from './Box.svelte';
	import DateLabel from '$lib/dates/dateLabel.svelte';
	import type { CustomDate } from '../../types/customDate';
	import type { Assignment } from '../../types/homework';

	export let postSubmit: (e: Event) => void = () => {
		return;
	};

	const currentDate = new Date();

	let date = createDate(currentDate);

	let newSubject = '';
	let newDescription = '';
	let newDate = getDateInInputFormat(new Date(currentDate.getTime() + 24 * 60 * 60 * 1000));

	let assignedAtDateObj: CustomDate;

	let assignments: Assignment[] = [];

	let newAssignmentButtonDisabled = false;
	let submitButtonDisabled = false;

	function handleNewAssignmentButtonClick(e: Event) {
		e.preventDefault();

		const [year, month, day] = newDate.split('-').map(Number);
		assignments = [
			...assignments,
			{
				subject: newSubject,
				description: newDescription,
				due: { year, month, day }
			}
		];

		newSubject = newDescription = '';
	}

	$: {
		let allFieldsFilled = !!newSubject && !!newDescription && !!newDate;
		let validDate = new Date(newDate) > new Date(date.year, date.month - 1, date.day);

		newAssignmentButtonDisabled = !(allFieldsFilled && validDate);
	}

	$: {
		let assignmentsLongEnough = assignments.length >= 1;
		let classNotEmpty = $page.url.searchParams.get('class') !== '';

		submitButtonDisabled = !(assignmentsLongEnough && classNotEmpty);
	}
</script>

<Box hideOnPrint>
	<form
		on:submit={(e) => {
			e.preventDefault();
			const bodyObj = {
				from: assignedAtDateObj,
				className: $page.url.searchParams.get('class'),
				assignments
			};

			fetch(PUBLIC_API_URL + '/homework', {
				method: 'POST',
				headers: new Headers({
					authorization: `Bearer ${localStorage.getItem('token')}`,
					'content-type': 'application/json'
				}),
				body: JSON.stringify(bodyObj)
			}).then((res) => res.json());

			assignments = [];

			postSubmit(e);
		}}
	>
		<h3 class="mb-4">
			<DatePicker bind:dateObj={assignedAtDateObj} />
		</h3>
		<div>
			<ul>
				{#each assignments as assignment}
					<li class="flex justify-between items-start">
						<div>
							<span class="flex flex-row gap-2 items-center justify-start">
								<h4>{assignment.subject}</h4>
								<p>
									<DateLabel date={assignment.due} />
								</p>
							</span>
							<p>{assignment.description}</p>
						</div>
						<button
							class="bx bx-trash text-red-500 dark:text-red-400 p-3"
							on:click={(e) => {
								e.preventDefault();
								assignments = assignments.filter((a) => a !== assignment);
							}}
						/>
					</li>
				{/each}

				{#if assignments.length !== 0}
					<hr class="mb-3" />
				{/if}

				<li class="flex flex-col gap-2">
					<div class="flex flex-row items-center justify-start gap-2 my-2">
						<input
							type="text"
							placeholder={i('homework.add.subject')}
							bind:value={newSubject}
							class="w-full outline-1 outline-gray-400 outline rounded-sm p-1 bg-transparent text-light-text dark:text-dark-text"
						/>
						<span class="min-w-max outline-1 outline-gray-400 outline rounded-sm p-1">
							<DatePicker bind:date={newDate} />
						</span>
					</div>
					<div class="flex gap-2">
						<input
							type="text"
							placeholder={i('homework.add.description')}
							bind:value={newDescription}
							class="w-full outline-1 outline-gray-400 outline rounded-sm p-1 bg-transparent text-light-text dark:text-dark-text"
						/>
						<SubmitButton
							value="+"
							onClick={handleNewAssignmentButtonClick}
							disabled={newAssignmentButtonDisabled}
							topMargin="0"
							width="50%"
						/>
					</div>
				</li>
			</ul>
		</div>
		<SubmitButton value={i('homework.add.submit')} disabled={submitButtonDisabled} />
	</form>
</Box>

<style>
	/* input {
		color: var(--text);
		background-color: transparent;
		border: none;
		border-radius: 0.125rem;
		padding: 0.125rem;
		outline: 1px solid gray;
	} */
	/* input:focus-visible {
		outline: 2px solid var(--accent);
	} */
</style>
