<script lang="ts">
	import SubmitButton from '$lib/SubmitButton.svelte';
	import { isLoggedIn } from '$lib/helpers/isLoggedIn.js';
	import Box from '$lib/homework/Box.svelte';
	import { onMount } from 'svelte';
	import type { RequestsResponse } from '../../../types/request';
	import DateLabel from '$lib/dates/dateLabel.svelte';
	import { createDateFromTimestamp } from '$lib/dates/createDateObject';
	import { getClassById } from '$lib/classes/getClass';
	import { invalidateAll } from '$app/navigation';
	import I18n from '$lib/I18n.svelte';
	import { i } from '../../../languages/i18n';
	import { title } from '../../../stores';
	import { addToast } from '$lib/toast/addToast';
	import { backendUrl } from '$lib/../stores';

	title.set('request.list.title');

	export let data: RequestsResponse;

	const reload = () => {
		invalidateAll();
		data = data;
	};

	const processRequest = (operation: 'accept' | 'reject', id: string) => {
		const uri = `/auth/requests/${id}/${operation}`;
		fetch($backendUrl + uri, {
			method: 'PATCH',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})
			.then((res) => {
				const type = res.ok ? 'success' : 'error';
				const token = `toast.request.list.${operation}.${type}` as const;
				addToast({
					type,
					content: token,
					duration: 5000
				});

				if (res.ok) reload();
			})
			.catch(() => {
				addToast({
					type: 'error',
					content: `toast.request.list.${operation}.error`,
					duration: 5000
				});
			});
	};

	onMount(() => {
		if (!isLoggedIn()) window.location.href = '/login?redirect=/requests/list?status=p';
	});
</script>

{#if !data.data}
	<p><I18n key="request.list.noData" /></p>
{:else if data.data.length === 0}
	<p><I18n key="request.list.noData" /></p>
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
							<I18n key="request.list.wantsToJoin" />
							{#await getClassById(req.classId)}
								...
							{:then classData}
								{classData.data?.name}
							{/await}
						</div>
						<hr />
						<div>
							{#if req.userDetails.acceptedClasses.length !== 0}
								<p><I18n key="request.list.acceptedIn" /></p>
								<ul class="list-disc">
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
								<p><I18n key="request.list.accepted.none" /></p>
							{/if}
						</div>
						<hr />
					</div>
					<div>
						<I18n>
							<SubmitButton
								value={i('request.list.accept')}
								onClick={(e) => {
									e.preventDefault();
									if (confirm(i('request.list.accept.confirm'))) processRequest('accept', req._id);
								}}
							/>
							<SubmitButton
								value={i('request.list.reject')}
								onClick={(e) => {
									e.preventDefault();
									if (confirm(i('request.list.reject.confirm'))) processRequest('reject', req._id);
								}}
								colour="red"
							/>
						</I18n>
					</div>
				</div>
			</Box>
		{/each}
	</div>
{/if}
