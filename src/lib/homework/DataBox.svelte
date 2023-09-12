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
	import Modal from '$lib/Modal.svelte';

	export let date: CustomDate;
	export let assignments: Assignment[];
	export let id: string;
	export let createdAt: number;

	export let postUpdate: () => void = () => {
		return;
	};

	let shareEnabled = false;
	let copyEnabled = false;

	let errorMessage = '';
	let successMessage = '';

	let dialogIsOpen = false;

	let editMode = false;

	export let validUser: boolean;

	onMount(() => {
		shareEnabled = !!navigator.share;
		copyEnabled = !!navigator.clipboard;
	});
</script>

<Box hideOnPrint={editMode} {id} fullHeight>
	<div class="h-full flex flex-col justify-between">
		<DataBoxInner {assignments} {date} {id} {postUpdate} bind:editMode {createdAt} />
		<div class="w-full flex flex-col">
			<div class="w-full flex flex-row items-center justify-evenly">
				{#if shareEnabled}
					<QuickActionButton
						iconName="bx-share-alt"
						focusedIconName="bxs-share-alt"
						color="text-green-500 dark:text-green-600"
						on:click={() => {
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
						on:click={() => {
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
				<QuickActionButton
					iconName="bx-window-open"
					on:click={() => {
						dialogIsOpen = true;
					}}
				/>
				{#if validUser}
					<QuickActionButton
						iconName="bx-edit"
						focusedIconName="bxs-edit"
						color="text-blue-500"
						on:click={() => {
							editMode = !editMode;
						}}
					/>
					<QuickActionButton
						iconName="bx-trash"
						focusedIconName="bxs-trash"
						color="text-red-500 dark:text-red-400"
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

<Modal bind:open={dialogIsOpen}>
	<DataBoxInner {assignments} {date} {id} {postUpdate} editMode={false} {createdAt} />
</Modal>
