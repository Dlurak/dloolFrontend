<script lang="ts">
	import DatePicker from './DatePicker.svelte';

	import { page } from '$app/stores';
	import { PUBLIC_API_URL } from '$env/static/public';
	import SubmitButton from '$lib/SubmitButton.svelte';
	import { getWeekdayByDate } from '$lib/dataWeekday';
	import { i } from '@inlang/sdk-js';
	import { createDate } from '$lib/dates/createDateObject';
	import { getDateInInputFormat } from '$lib/dates/getDateInInputFormat';

	export let preSubmit: (e: Event) => void = () => {
		return;
	};

	const currentDate = new Date();

	let date = createDate(currentDate);

	let newSubject = '';
	let newDescription = '';
	let newDate = getDateInInputFormat(new Date(currentDate.getTime() + 24 * 60 * 60 * 1000));

	let assignedAtDateObj: {
		day: number;
		month: number;
		year: number;
	};

	let assignments: {
		subject: string;
		description: string;
		due: {
			year: number;
			month: number;
			day: number;
		};
	}[] = [];

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

<div class="box">
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

			preSubmit(e);
		}}
	>
		<DatePicker bind:dateObj={assignedAtDateObj} />

		<div id="assignments">
			<ul id="assignments-list">
				{#each assignments as assignment}
					<li>
						<span class="first-row">
							<h4>{assignment.subject}</h4>
							<p>
								{getWeekdayByDate(assignment.due)}
								{assignment.due.day}.{assignment.due.month}.{assignment.due.year}
							</p>
						</span>
						<p class="description">{assignment.description}</p>
					</li>
				{/each}

				<li id="add-item">
					<div class="first-row">
						<input type="text" placeholder={i('homework.add.subject')} bind:value={newSubject} />
						<span class="dateWrapper">
							<DatePicker bind:date={newDate} />
						</span>
					</div>
					<span class="second-row">
						<input
							type="text"
							placeholder={i('homework.add.description')}
							bind:value={newDescription}
							class="description-input"
						/>
						<SubmitButton
							value="+"
							onClick={handleNewAssignmentButtonClick}
							disabled={newAssignmentButtonDisabled}
							topMargin="0"
							width="50%"
						/>
					</span>
				</li>
			</ul>
		</div>

		<SubmitButton value={i('homework.add.submit')} disabled={submitButtonDisabled} />
	</form>
</div>

<style>
	.box {
		padding: 1rem;
		border-radius: 1rem;
		background-color: var(--bg);
	}

	.first-row {
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
		align-items: center;
		justify-content: start;
	}

	li .first-row {
		align-items: start;
	}

	li .first-row * {
		margin-top: 0;
	}

	li p {
		margin-block: 0;
	}

	li h4 {
		margin-bottom: 0.75rem;
	}

	#add-item {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	#add-item .first-row {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr));
	}

	#add-item .second-row {
		display: flex;
		gap: 0.5rem;
	}

	#assignments-list {
		padding: 0;
		list-style-type: none;
	}
	#assignments-list li:not(:last-child)::after {
		content: '';
		display: inline-block;
		height: 0.125rem;
		width: 100%;
		border-radius: 100vmax;

		background-color: var(--text);

		margin-block: 0.5rem;
	}

	input {
		color: var(--text);
		background-color: transparent;
		border: none;
		border-radius: 0.25rem;
		padding: 0.125rem;
		outline: 1px solid gray;
	}
	input:focus-visible {
		outline: 2px solid var(--accent);
	}

	.description-input {
		width: 100%;
	}

	.dateWrapper {
		width: 100%;
		outline: 1px solid gray;
	}
</style>
