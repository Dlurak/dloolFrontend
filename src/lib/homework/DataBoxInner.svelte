<script lang="ts">
	import SubmitButton from '$lib/SubmitButton.svelte';
	import TimeAgo from '$lib/dates/TimeAgo.svelte';
	import html2canvas from 'html2canvas';
	import type { CustomDate } from '../../types/customDate';
	import type { Assignment } from '../../types/homework';
	import DatePicker from '../dates/DatePicker.svelte';
	import DateLabel from '../dates/dateLabel.svelte';
	import CreateHomeworkInner from './CreateHomeworkInner.svelte';
	import { addToast } from '$lib/toast/addToast';
	import { network } from '../../stores';
	import DataBoxAssignment from './DataBoxAssignment.svelte';
	import { updateHomework } from './updateHomework';
	import { Status } from '../../enums/status';
	import UserOverview from './UserOverview.svelte';
	import { sortByAmount } from '$lib/utils/arrays/sort';

	export let date: CustomDate;
	export let assignments: Assignment[];
	export let id: string;
	export let editMode = false;
	export let createdAt: number;
	export let contributors: string[];

	let capturing = false;
	let container: HTMLDivElement;
	export const screenshot = () => {
		capturing = true;
		// wait 100ms for the html2canvas so the dom can update
		setTimeout(() => {
			html2canvas(container).then((canvas) => {
				const url = canvas.toDataURL();
				const a = document.createElement('a');
				a.href = url;
				a.download = 'Dlool-homework.png';
				a.click();

				capturing = false;

				addToast({
					type: 'success',
					content: 'toast.homework.screenshot.success',
					duration: 5000
				});
			});
		}, 100);
	};

	export let postUpdate: () => void = () => {
		return;
	};

	// EDIT MODE THINGS //

	let newDate = date;
	let newAssignments: Assignment[] = assignments;
	let disabled = false;

	$: {
		const allFilled = newAssignments.every((assignment) => {
			return assignment.subject && assignment.description;
		});
		const isOnline = $network === 'online';
		disabled = !allFilled || !isOnline;
	}
</script>

<div class="w-full {capturing ? 'bg-light-box dark:bg-dark-box p-3' : ''}" bind:this={container}>
	<div class="flex flex-col">
		<h3>
			{#if editMode}
				<DatePicker bind:dateObj={newDate} />
			{:else}
				<DateLabel {date} />
			{/if}
		</h3>
		<TimeAgo classes="text-xs" timestamp={createdAt} type="edited" />
	</div>
	{#if editMode}
		<CreateHomeworkInner
			bind:assignments={newAssignments}
			bind:date={newDate}
			canUseTimetable={false}
		/>
	{:else}
		<ul class="list-none p-0 flex flex-col gap-3">
			{#each assignments as assignment}
				<DataBoxAssignment {assignment} />
			{/each}
		</ul>
	{/if}
	{#if editMode}
		<SubmitButton
			value="Update"
			{disabled}
			onClick={async () => {
				editMode = false;

				const status = await updateHomework({
					id,
					newDate,
					assignments: newAssignments
				});

				if (status === Status.SUCCESS) postUpdate();
			}}
		/>
	{/if}

	<UserOverview contributors={sortByAmount(contributors)} />
</div>
