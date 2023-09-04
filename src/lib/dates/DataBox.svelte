<script lang="ts">
	import { PUBLIC_API_URL } from '$env/static/public';
	import SubmitButton from '$lib/SubmitButton.svelte';
	import { i } from '@inlang/sdk-js';
	import type { CustomDate } from '../../types/customDate';
	import type { Assignment } from '../../types/homework';
	import Box from '../homework/Box.svelte';
	import DatePicker from './DatePicker.svelte';
	import DateLabel from './dateLabel.svelte';
	import { error } from '@sveltejs/kit';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import CentralFormBox from '$lib/CentralFormBox.svelte';

	export let date: CustomDate;
	export let assignments: Assignment[];
	export let id: string;

	export let postUpdate: () => void = () => {
		return;
	};

	let editButtonIsFocused = false;
	let deleteButtonIsFocused = false;
	let shareButtonIsFocused = false;

	let shareEnabled = false;
	let copyEnabled = false;

	let errorMessage = '';
	let successMessage = '';

	let editMode = false;

	// EDIT MODE THINGS //

	let newDate = date;
	let newAssignments: Assignment[] = assignments;
	let disabled = false;

	export let validUser: boolean;

	onMount(() => {
		shareEnabled = !!navigator.share;
		copyEnabled = !!navigator.clipboard;
	});

	$: {
		const allFilled = newAssignments.every((assignment) => {
			return assignment.subject && assignment.description;
		});
		disabled = !allFilled;
	}
</script>

<Box hideOnPrint={editMode} {id}>
	<div class="flex flex-col items-start justify-between h-full">
		<div class="w-full">
			<div class="flex justify-between items-center">
				<h3>
					{#if editMode}
						<DatePicker bind:dateObj={newDate} />
					{:else}
						<DateLabel {date} />
					{/if}
				</h3>
				<div>
					{#if validUser}
						<button
							class="print:hidden p-3 bx bx{deleteButtonIsFocused
								? 's'
								: ''}-trash text-red-500 dark:text-red-400"
							title={i('homework.delete')}
							on:focus={() => {
								deleteButtonIsFocused = true;
							}}
							on:blur={() => {
								deleteButtonIsFocused = false;
							}}
							on:click={() => {
								// confirm deletion
								const confirmed = confirm(i('homework.delete.confirm'));
								if (!confirmed) return;
								const uri = `/homework/${id}`;
								const url = PUBLIC_API_URL + uri;
								fetch(url, {
									method: 'DELETE',
									headers: {
										Authorization: `Bearer ${localStorage.getItem('token')}`
									}
								}).then(() => {
									postUpdate();
								});
							}}
						/>
						<button
							class="print:hidden p-3 bx bx{editButtonIsFocused ? 's' : ''}-edit text-blue-500"
							on:focus={() => {
								editButtonIsFocused = true;
							}}
							on:blur={() => {
								editButtonIsFocused = false;
							}}
							on:click={() => {
								editMode = !editMode;
							}}
						/>
					{/if}
					{#if shareEnabled || copyEnabled}
						<button
							class="print:hidden p-3 bx bx{shareButtonIsFocused
								? 's'
								: ''}-share-alt text-green-500 dark:text-green-600"
							on:focus={() => {
								shareButtonIsFocused = true;
							}}
							on:blur={() => {
								shareButtonIsFocused = false;
							}}
							on:click={() => {
								const shareUrl = $page.url.toString() + `#${id}`;
								if (shareEnabled) {
									try {
										navigator.share({
											title: 'Dlool',
											text: 'Check out this homework!',
											url: shareUrl
										});
										return;
									} catch (e) {
										return;
									}
								} else if (copyEnabled) {
									navigator.clipboard.writeText(shareUrl).then(() => {
										successMessage = i('tricks.export.copy.success');
										setTimeout(() => {
											successMessage = '';
										}, 5000);
									});
									return;
								}
							}}
						/>
					{/if}
				</div>
			</div>
			<ul class="list-none p-0">
				{#if editMode}
					{#each newAssignments as assignment}
						<li class="flex flex-row">
							<div class="w-full">
								<span class="flex flex-row items-center justify-start gap-2 my-2">
									<div class="flex flex-row w-full gap-2">
										<input type="text" bind:value={assignment.subject} class="w-full" />
										<span class="min-w-max outline-1 outline-gray-400 outline rounded-sm p-1">
											<DatePicker bind:dateObj={assignment.due} />
										</span>
									</div>
								</span>
								<input type="text" bind:value={assignment.description} class="w-full" />
							</div>
						</li>
					{/each}
				{:else}
					{#each assignments as assignment}
						<li class="flex flex-row">
							<div class="w-full">
								<span class="flex flex-row items-center justify-start gap-2 my-2">
									<h4>{assignment.subject}</h4>
									<DateLabel date={assignment.due} />
								</span>
								<p class="my-2">{assignment.description}</p>
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
						fetch(url, {
							method: 'PUT',
							headers: {
								'Content-Type': 'application/json',
								Authorization: `Bearer ${localStorage.getItem('token')}`
							},
							body: JSON.stringify({
								from: newDate,
								assignments: newAssignments
							})
						}).then(() => postUpdate());
					}}
				/>
			{/if}
		</div>
		<div class="w-full text-center">
			<p class:hidden={!successMessage} class="text-light-success dark:text-dark-success">
				{successMessage}
			</p>
			<p class:hidden={!errorMessage} class="text-light-error dark:text-dark-error">
				{errorMessage}
			</p>
		</div>
	</div>
</Box>

<style>
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
</style>
