<script lang="ts">
	import DataBoxInner from './DataBoxInner.svelte';

	import { PUBLIC_API_URL } from '$env/static/public';
	import { i } from '@inlang/sdk-js';
	import type { CustomDate } from '../../types/customDate';
	import type { Assignment } from '../../types/homework';
	import Box from './Box.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

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

	let shareIcon = 'share-alt';

	let errorMessage = '';
	let successMessage = '';

	let dialogElement: HTMLDialogElement;
	let dialogIsOpen = false;

	const openDialog = () => {
		dialogElement.showModal();
		dialogIsOpen = true;
	};
	const closeDialog = () => {
		dialogElement.close();
		dialogIsOpen = false;
	};
	const toggleDialog = () => {
		if (dialogIsOpen) {
			closeDialog();
		} else {
			openDialog();
		}
	};

	let editMode = false;

	export let validUser: boolean;

	onMount(() => {
		shareEnabled = !!navigator.share;
		copyEnabled = !!navigator.clipboard;

		if (shareEnabled) {
			shareIcon = 'share-alt';
		} else if (copyEnabled) {
			shareIcon = 'copy-alt';
		} else {
			shareIcon = 'shield-x';
		}
	});
</script>

<Box hideOnPrint={editMode} {id}>
	<div class="h-full flex flex-col justify-between">
		<DataBoxInner {assignments} {date} {id} {postUpdate} bind:editMode />
		<div class="w-full flex flex-col">
			<div class="w-full flex flex-row items-center justify-evenly">
				{#if shareEnabled || copyEnabled}
					<button
						class="print:hidden p-3 bx bx{shareButtonIsFocused
							? 's'
							: ''}-{shareIcon} text-green-500 dark:text-green-600"
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
				<button
					class="bx bx-window-open print:hidden p-3"
					on:click={() => {
						toggleDialog();
					}}
				/>
				{#if validUser}
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
	</div>
</Box>

<dialog
	bind:this={dialogElement}
	class="p-4 rounded-md backdrop:bg-black backdrop:opacity-50 resize bg-light-box dark:bg-dark-box text-light-text dark:text-dark-text"
>
	<div class="w-full flex flex-row justify-end">
		<button on:click={toggleDialog} class="bx bx-window-close" />
	</div>
	<DataBoxInner {assignments} {date} {id} {postUpdate} editMode={false} />
</dialog>

<style>
	dialog::backdrop {
		--blur: blur(10px);

		-webkit-backdrop-filter: var(--blur);
		backdrop-filter: var(--blur);
	}
</style>
