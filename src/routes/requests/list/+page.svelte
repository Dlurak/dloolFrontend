<script lang="ts">
	import SubmitButton from '$lib/SubmitButton.svelte';
	import { isLoggedIn } from '$lib/helpers/isLoggedIn.js';
	import Box from '$lib/homework/Box.svelte';
	import { onMount } from 'svelte';
	import type { RequestsResponse } from '../../../types/request';
	import DateLabel from '$lib/dates/dateLabel.svelte';
	import { createDateFromTimestamp } from '$lib/dates/createDateObject';
	import { getClassById } from '$lib/classes/getClass';

	export let data: RequestsResponse;

	onMount(() => {
		if (!isLoggedIn()) window.location.href = '/login?redirect=/requests/list?status=p';
	});
</script>

{#if !data.data}
	<p>There are no requests to show.</p>
{:else if data.data.length === 0}
	<p>There are no requests to show.</p>
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
							Wants to join
							{#await getClassById(req.classId)}
								...
							{:then classData}
								{classData.data?.name}
							{/await}
						</div>
						<hr />
						<div>
							{#if req.userDetails.acceptedClasses.length !== 0}
								<p>Accepted in:</p>
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
								<p>This user isn't accepted in any class</p>
							{/if}
						</div>
						<hr />
					</div>
					<div>
						<SubmitButton
							value="Accept"
							onClick={(e) => {
								e.preventDefault();
							}}
							disabled
						/>
						<SubmitButton
							value="Reject"
							onClick={(e) => {
								e.preventDefault();
							}}
							colour="red"
							disabled
						/>
					</div>
				</div>
			</Box>
		{/each}
	</div>
{/if}
