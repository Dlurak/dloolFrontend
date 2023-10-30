<script lang="ts">
	import { PUBLIC_API_URL } from '$env/static/public';
	import I18n from '$lib/I18n.svelte';
	import { onMount } from 'svelte';
	import type { RequestData, RequestStatus } from '../../types/request';

	let data: RequestData | null = null;

	let colorObj: {
		[key in RequestStatus]: string;
	} = {
		pending: 'bg-blue-500',
		accepted: 'bg-green-500',
		rejected: 'bg-red-500'
	};
	let color = colorObj['pending'];

	onMount(() => {
		const reqId = localStorage.getItem('registerRequest');
		if (!reqId) return;
		const eventSource = new EventSource(`${PUBLIC_API_URL}/auth/requests/${reqId}/sse`);

		eventSource.onmessage = (event) => {
			data = JSON.parse(event.data);
			color = colorObj[data?.status || 'pending'];
		};
	});
</script>

<div class="flex flex-col gap-3">
	{#if data}
		<h3><I18n key="request.status.status" /></h3>
		<div class="font-bold text-4xl capitalize p-7 {color} rounded-xl text-center">
			<I18n key="request.status.{data.status || 'pending'}" />
		</div>
	{:else}
		<p><I18n key="request.status.noData" /></p>
	{/if}
</div>
