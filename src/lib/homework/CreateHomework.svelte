<script lang="ts">
	import SubmitButton from '$lib/SubmitButton.svelte';
	import { getWeekdayByDate } from '$lib/dataWeekday';

	const currentDate = new Date();

	let date = {
		day: currentDate.getDate(),
		month: currentDate.getMonth() + 1,
		year: currentDate.getFullYear()
	};

	let assignments: any[] = [];
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
				<!--TODO: List from the assignments-->

				<li>
					<h4>
						<input type="text" placeholder="Subject" />
						<!--TODO: l10n-->
					</h4>
					<input type="date" />
					<p>
						<input type="text" placeholder="Description" />
					</p>
				</li>
			</ul>
			<button class="bx bx-plus" />
			<!--TODO: Clear the assignment inputs and add a new element to assignments-->
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
