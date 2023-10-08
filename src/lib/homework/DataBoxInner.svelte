<script lang="ts">
	import { PUBLIC_API_URL } from '$env/static/public';
	import I18n from '$lib/I18n.svelte';
	import SubmitButton from '$lib/SubmitButton.svelte';
	import TimeAgo from '$lib/dates/TimeAgo.svelte';
	import html2canvas from 'html2canvas';
	import {
		getIconForSubject,
		iconExistsForSubject,
		subjectIconsObject
	} from '../../constants/subjecticons';
	import { i } from '../../languages/i18n';
	import type { CustomDate } from '../../types/customDate';
	import type { Assignment } from '../../types/homework';
	import DatePicker from '../dates/DatePicker.svelte';
	import DateLabel from '../dates/dateLabel.svelte';
	import CreateHomeworkInner from './CreateHomeworkInner.svelte';
	import { addToast } from '$lib/toast/addToast';
	import { network } from '../../routes/stores';

	export let date: CustomDate;
	export let assignments: Assignment[];
	export let id: string;
	export let editMode = false;
	export let createdAt: number;
	export let creatorId: string;

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
	<ul class="list-none p-0">
		{#if editMode}
			<CreateHomeworkInner bind:assignments={newAssignments} />
		{:else}
			{#each assignments as assignment}
				<li class="flex flex-row">
					<div class="w-full">
						<span class="flex flex-row items-baseline justify-start gap-2 my-2">
							{#if iconExistsForSubject(assignment.subject.toLowerCase())}
								<i class="bx {getIconForSubject(assignment.subject.toLowerCase())}" />
							{/if}
							<h4>{assignment.subject}</h4>
							<DateLabel date={assignment.due} />
						</span>
						<p class="my-2 whitespace-pre-line">{assignment.description}</p>
					</div>
					<div class="hidden print:flex items-start">
						<div class="w-4 h-4 rounded-md border border-solid border-gray-400" />
					</div>
				</li>
			{/each}
		{/if}
	</ul>
	{#if editMode}
		<SubmitButton
			value="Update"
			{disabled}
			onClick={() => {
				editMode = false;
				const url = `${PUBLIC_API_URL}/homework/${id}`;

				const mappedAssignments = newAssignments.map((assignment) => {
					return {
						subject: assignment.subject.trim(),
						description: assignment.description.trim(),
						due: assignment.due
					};
				});

				fetch(url, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('token')}`
					},
					body: JSON.stringify({
						from: newDate,
						assignments: mappedAssignments
					})
				})
					.then((res) => {
						if (res.ok) {
							addToast({
								type: 'success',
								content: 'toast.homework.edit.success',
								duration: 5000
							});
							postUpdate();
						} else throw new Error();
					})
					.catch(() => {
						addToast({
							type: 'error',
							content: 'toast.homework.edit.error',
							duration: 5000
						});
					});
			}}
		/>
	{/if}
	{#await fetch(`${PUBLIC_API_URL}/auth/${creatorId}`).then((res) => res.json()) then userData}
		<I18n>
			<p class="text-xs">{userData.data.user.name || i('error')}</p>
		</I18n>
	{/await}
</div>
