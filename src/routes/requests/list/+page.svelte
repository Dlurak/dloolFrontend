<script lang="ts">
	import SubmitButton from '$lib/SubmitButton.svelte';
	import { isLoggedIn } from '$lib/helpers/isLoggedIn.js';
	import Box from '$lib/homework/Box.svelte';
	import { onMount } from 'svelte';
	import type { RequestsResponse } from '../../../types/request';
	import DateLabel from '$lib/dates/dateLabel.svelte';
	import { createDateFromTimestamp } from '$lib/dates/createDateObject';
	import { getClassById } from '$lib/classes/getClass';
	import { PUBLIC_API_URL } from '$env/static/public';
	import { invalidateAll } from '$app/navigation';
	import { i } from '@inlang/sdk-js';

	export let data: RequestsResponse;

	const reload = () => {
		invalidateAll();
		data = data;
	};

	const processRequest = (operation: 'accept' | 'reject', id: string) => {
		const uri = `/auth/requests/${id}/${operation}`;
		fetch(PUBLIC_API_URL + uri, {
			method: 'PATCH',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		}).then(reload);
	};

	onMount(() => {
		if (!isLoggedIn()) window.location.href = '/login?redirect=/requests/list?status=p';
	});
</script>

<svelte:head>
	<title>Dlool | {i('request.list.title')}</title>
</svelte:head>

{#if !data.data}
	<p>{i('request.list.noData')}</p>
{:else if data.data.length === 0}
	<p>{i('request.list.noData')}</p>
{:else}
	<div class="grid grid-cols-box-list w-full gap-4">
		{#each data.data as req}
			<Box>
				<div id={req._id} class="flex flex-col justify-between h-full">
					<div>
						<div class="flex flex-row justify-between">
							<div>
								<h4>{req.userDetails.name}</h4>
								{req.userDetails.username}
							</div>
							<div><DateLabel date={createDateFromTimestamp(req.createdAt)} /></div>
						</div>
						<hr />
						<div>
							{i('request.list.wantsToJoin')}
							{#await getClassById(req.classId)}
								...
							{:then classData}
								{classData.data?.name}
							{/await}
						</div>
						<hr />
						<div>
							{#if req.userDetails.acceptedClasses.length !== 0}
								<p>{i('request.list.acceptedIn')}</p>
								<ul class="list-disc pl-6">
									{#each req.userDetails.acceptedClasses as classId}
										<li>
											{#await getClassById(classId)}
												...
											{:then classData}
												{classData.data?.name}
											{/await}
										</li>
									{/each}
								</ul>
							{:else}
								<p>{i('request.list.accepted.none')}</p>
							{/if}
						</div>
						<hr />
					</div>
					<div>
						<SubmitButton
							value={i('request.list.accept')}
							onClick={(e) => {
								e.preventDefault();
								processRequest('accept', req._id);
							}}
						/>
						<SubmitButton
							value={i('request.list.reject')}
							onClick={(e) => {
								e.preventDefault();
								processRequest('reject', req._id);
							}}
							colour="red"
						/>
					</div>
				</div>
			</Box>
		{/each}
	</div>
{/if}
