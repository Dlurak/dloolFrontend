<script lang="ts">
	import DatePicker from '../dates/DatePicker.svelte';

	import { page } from '$app/stores';
	import { PUBLIC_API_URL } from '$env/static/public';
	import SubmitButton from '$lib/SubmitButton.svelte';
	import { i } from '@inlang/sdk-js';
	import { createDate } from '$lib/dates/createDateObject';
	import Box from './Box.svelte';
	import type { CustomDate } from '../../types/customDate';
	import type { Assignment } from '../../types/homework';
	import QuickActionButton from '$lib/QuickActionButton.svelte';
	import { swapArrayElements } from '$lib/utils/SwapItems';

	export let postSubmit: (e: Event) => void = () => {
		return;
	};

	const currentDate = new Date();
	let date = createDate(currentDate);

	let assignedAtDateObj: CustomDate;

	let assignments: Assignment[] = [
		{
			subject: '',
			description: '',
			due: date
		}
	];

	let submitButtonDisabled = false;

	$: {
		const allFilled = assignments.every((assignment) => {
			return assignment.subject && assignment.description;
		});
		submitButtonDisabled = !allFilled;
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

			assignments = [
				{
					subject: '',
					description: '',
					due: date
				}
			];

			postSubmit(e);
		}}
	>
		<h3 class="mb-4">
			<DatePicker bind:dateObj={assignedAtDateObj} />
		</h3>
		<ul>
			{#each assignments as assignment}
				<li class="flex flex-row">
					<div class="flex flex-col justify-evenly items-center">
						<QuickActionButton
							iconName="bx-up-arrow"
							focusedIconName="bxs-up-arrow"
							onClick={() => {
								const index = assignments.indexOf(assignment);
								const newIndex = index - 1;

								assignments = swapArrayElements(assignments, index, newIndex);
							}}
							disabled={assignments.indexOf(assignment) === 0}
						/>
						<QuickActionButton
							iconName="bx-down-arrow"
							focusedIconName="bxs-down-arrow"
							onClick={() => {
								const index = assignments.indexOf(assignment);
								const newIndex = index + 1;

								assignments = swapArrayElements(assignments, index, newIndex);
							}}
							disabled={assignments.indexOf(assignment) === assignments.length - 1}
						/>
					</div>
					<div class="w-full">
						<span class="flex flex-row items-center justify-start gap-2 my-2">
							<div class="flex flex-row w-full gap-2">
								<input
									type="text"
									bind:value={assignment.subject}
									placeholder={i('homework.add.subject')}
									class="w-full outline-1 outline-gray-400 outline rounded-sm p-1"
								/>
								<span class="min-w-max outline-1 outline-gray-400 outline rounded-sm p-1">
									<DatePicker bind:dateObj={assignment.due} />
								</span>
							</div>
						</span>
						<textarea
							bind:value={assignment.description}
							placeholder={i('homework.add.description')}
							class="w-full outline-1 outline-gray-400 outline rounded-sm p-1"
							rows="2"
						/>
					</div>
				</li>
			{/each}
		</ul>
		<div class="flex flex-row gap-2">
			<SubmitButton
				value="-"
				colour="red"
				disabled={assignments.length === 1}
				onClick={(e) => {
					e.preventDefault();
					assignments = assignments.slice(0, assignments.length - 1);
				}}
			/>
			<SubmitButton
				value="+"
				disabled={assignments.at(-1)?.subject.trim() === '' ||
					assignments.at(-1)?.description.trim() === ''}
				colour="yellow"
				onClick={(e) => {
					e.preventDefault();
					assignments = [
						...assignments,
						{
							subject: '',
							description: '',
							due: date
						}
					];
				}}
			/>
		</div>
		<SubmitButton value={i('homework.add.submit')} disabled={submitButtonDisabled} />
	</form>
</Box>

<style>
	input,
	textarea {
		color: var(--text);
		background-color: transparent;
	}
	:is(input, textarea):focus-visible {
		outline: 2px solid var(--accent);
	}
</style>
