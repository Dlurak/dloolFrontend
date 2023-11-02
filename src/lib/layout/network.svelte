<script>
	import { addToast } from '$lib/toast/addToast';
	import { onMount } from 'svelte';

	import { network } from '../../stores';

	network.set('online');

	onMount(() => {
		network.set(navigator.onLine ? 'online' : 'offline');
	});
</script>

<svelte:window
	on:online={() => {
		network.set('online');
		addToast({
			content: 'toast.network.online',
			type: 'success',
			duration: 5000
		});
	}}
	on:offline={() => {
		network.set('offline');
		addToast({
			content: 'toast.network.offline',
			type: 'warning',
			duration: 5000
		});
	}}
/>
