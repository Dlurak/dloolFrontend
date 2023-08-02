<script lang="ts">
	import { page } from '$app/stores';
	import { PUBLIC_API_URL } from '$env/static/public';
	import SubmitButton from '$lib/SubmitButton.svelte';
	import { getWeekdayByDate } from '$lib/dataWeekday';

	export let preSubmit = (e: Event) => {};

	const currentDate = new Date();

	let date = createDate(currentDate);

	let newSubject: string = '';
	let newDescription: string = '';
	let newDate = getDateInInputFormat(new Date(currentDate.getTime() + 24 * 60 * 60 * 1000));

	let assignments: any[] = [];

	let newAssignmentButtonDisabled = false;
	let submitButtonDisabled = false;

	function createDate(d: Date) {
		return {
			day: d.getDate(),
			month: d.getMonth() + 1,
			year: d.getFullYear()
		};
	}

	function leadingZeroDaysAndMonths(n: number) {
		return `${n < 10 ? 0 : ''}${n}`;
	}

	function getDateInInputFormat(date: Date) {
		return `${date.getFullYear()}-${leadingZeroDaysAndMonths(
			date.getMonth() + 1
		)}-${leadingZeroDaysAndMonths(date.getDate())}`;
	}

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
			// TODO: check that the user is in the class
			e.preventDefault();
			const bodyObj = {
				from: date,
				className: $page.url.searchParams.get('class'),
				assignments
			};

			console.log(bodyObj);

			fetch(PUBLIC_API_URL + '/homework', {
				method: 'POST',
				headers: new Headers({
					authorization: `Bearer ${localStorage.getItem('token')}`,
					'content-type': 'application/json'
				}),
				body: JSON.stringify(bodyObj)
			})
				.then((res) => res.json())
				.then((j) => console.log(j));

			preSubmit(e);
		}}
	>
		<div class="first-row">
			<h3>
				{getWeekdayByDate(date)}
				{date.day}.{date.month}.{date.year}
			</h3>
			<i class="bx bx-calendar-plus" />
		</div>

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

				<li>
					<h4>
						<input type="text" placeholder="Subject" bind:value={newSubject} />
						<!--TODO: l10n-->
					</h4>
					<input type="date" bind:value={newDate} />
					<p>
						<input type="text" placeholder="Description" bind:value={newDescription} />
					</p>
				</li>
			</ul>

			<button
				class="bx bx-plus"
				on:click={handleNewAssignmentButtonClick}
				disabled={newAssignmentButtonDisabled}
			/>
		</div>

		<SubmitButton value="Temporary" disabled={submitButtonDisabled} />
	</form>
</div>

<style>
	.box {
		padding: 1rem;
		border-radius: 1rem;
		background-color: var(--bg);
	}
</style>
