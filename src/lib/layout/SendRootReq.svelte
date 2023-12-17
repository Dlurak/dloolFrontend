<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { backendUrl, backendHasResponse } from '../../stores';

	let apiUrl = '';

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let interval: any;

	backendUrl.update((v) => (apiUrl = v));

	onMount(() => {
		const sendReq = () =>
			fetch(apiUrl)
				.then(() => backendHasResponse.set(true))
				.catch(() => {
					backendHasResponse.set(false);
					setTimeout(sendReq, 3 * 1000);
				});

		sendReq();

		interval = setInterval(sendReq, 14 * 60 * 1000);
	});

	onDestroy(() => {
		clearInterval(interval);
	});
</script>
