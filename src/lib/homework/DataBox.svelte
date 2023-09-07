<script lang="ts">
	import DataBoxInner from './DataBoxInner.svelte';

	import { PUBLIC_API_URL } from '$env/static/public';
	import { i } from '@inlang/sdk-js';
	import type { CustomDate } from '../../types/customDate';
	import type { Assignment } from '../../types/homework';
	import Box from './Box.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import QuickActionButton from '$lib/QuickActionButton.svelte';

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
				{#if shareEnabled}
					<QuickActionButton
						iconName="bx-share-alt"
						focusedIconName="bxs-share-alt"
						color="text-green-500 dark:text-green-600"
						onClick={() => {
							const shareUrl = $page.url.toString() + `#${id}`;
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
						}}
					/>
				{/if}
				{#if !shareEnabled && copyEnabled}
					<QuickActionButton
						iconName="bx-copy-alt"
						focusedIconName="bxs-copy-alt"
						color="text-green-500 dark:text-green-600"
						onClick={() => {
							const shareUrl = $page.url.toString() + `#${id}`;
							navigator.clipboard.writeText(shareUrl).then(() => {
								successMessage = i('tricks.export.copy.success');
								setTimeout(() => {
									successMessage = '';
								}, 5000);
							});
						}}
					/>
				{/if}
				<QuickActionButton iconName="bx-window-open" onClick={toggleDialog} />
				{#if validUser}
					<QuickActionButton
						iconName="bx-edit"
						focusedIconName="bxs-edit"
						color="text-blue-500"
						onClick={() => {
							editMode = !editMode;
						}}
					/>
					<QuickActionButton
						iconName="bx-trash"
						focusedIconName="bxs-trash"
						color="text-red-500 dark:text-red-400"
						onClick={() => {
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
