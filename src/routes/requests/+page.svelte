<script lang="ts">
	import { i } from '@inlang/sdk-js';
	import type { RequestResponse, RequestStatus } from '../../types/request';

	export let data: RequestResponse;

	let isDataError = data.status === 'error';

	let colorObj: {
		[key in RequestStatus]: string;
	} = {
		pending: 'bg-blue-500',
		accepted: 'bg-green-500',
		rejected: 'bg-red-500'
	};
	let color = colorObj[data.data?.status || 'pending'];
</script>

<div class="flex flex-col gap-3">
	{#if data && !isDataError}
		<h3>{i('request.status.status')}</h3>
		<div class="font-bold text-4xl capitalize p-7 {color} rounded-xl text-center">
			{i(`request.status.${data.data?.status}`)}
		</div>
	{:else}
		<p>{i('request.status.noData')}</p>
	{/if}
</div>
