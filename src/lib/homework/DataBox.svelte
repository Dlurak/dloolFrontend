<script lang="ts">
	import DataBoxInner from './DataBoxInner.svelte';

	import type { CustomDate } from '../../types/customDate';
	import type { Assignment } from '../../types/homework';
	import Box from './Box.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import QuickActionButton from '$lib/QuickActionButton.svelte';
	import Modal from '$lib/Modal.svelte';
	import { i } from '../../languages/i18n';
	import { addToast } from '$lib/toast/addToast';
	import { network } from '../../stores';
	import { backendUrl } from '$lib/../stores';

	export let date: CustomDate;
	export let assignments: Assignment[];
	export let id: string;
	export let createdAt: number;
	export let contributors: string[];

	export let postUpdate: () => void = () => {
		return;
	};

	let shareEnabled = false;
	let copyEnabled = false;

	let dialogIsOpen = false;

	let editMode = false;

	let screenshot: () => void;

	export let validUser: boolean;

	onMount(() => {
		shareEnabled = !!navigator.share;
		copyEnabled = !!navigator.clipboard;
	});
</script>

<Box hideOnPrint={editMode} {id} fullHeight>
	<div class="h-full flex flex-col justify-between">
		<DataBoxInner
			{assignments}
			{contributors}
			{date}
			{id}
			{postUpdate}
			bind:editMode
			{createdAt}
			bind:screenshot
		/>
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
								addToast({
									type: 'success',
									content: 'tricks.export.copy.success',
									duration: 5000
								});
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
				{#if validUser && $network === 'online'}
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
							const url = $backendUrl + uri;
							fetch(url, {
								method: 'DELETE',
								headers: {
									Authorization: `Bearer ${localStorage.getItem('token')}`
								}
							})
								.then((res) => {
									if (res.ok) {
										addToast({
											type: 'success',
											content: 'toast.homework.delete.success',
											duration: 5000
										});
										postUpdate();
									} else {
										throw new Error();
									}
								})
								.catch(() => {
									addToast({
										type: 'error',
										content: 'toast.homework.delete.error',
										duration: 5000
									});
								});
						}}
					/>
				{/if}
				<QuickActionButton iconName="bx-image" on:click={screenshot} />
			</div>
		</div>
	</div>
</Box>

<Modal bind:open={dialogIsOpen}>
	<DataBoxInner
		{assignments}
		{contributors}
		{date}
		{id}
		{postUpdate}
		editMode={false}
		{createdAt}
	/>
</Modal>
