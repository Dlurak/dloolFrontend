<script lang="ts">
	import SubmitButton from '$lib/SubmitButton.svelte';
	import { getWeekdayByDate } from '$lib/dataWeekday';

	const currentDate = new Date();

	let date = createDate(currentDate);

	let newSubject: string = '';
	let newDescription: string = '';
	let newDate = getDateInInputFormat(new Date(currentDate.getTime() + 24 * 60 * 60 * 1000));

	let assignments: any[] = [];

	let newAssignmentButtonDisabled = false;

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
</script>

<div class="box">
	<form>
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

		<SubmitButton value="Temporary" />
	</form>
</div>

<style>
	.box {
		padding: 1rem;
		border-radius: 1rem;
		background-color: var(--bg);
	}
</style>
