<script>
	import { browser } from '$app/environment';
	import { isLoggedIn } from '$lib/helpers/isLoggedIn';
	import { addToast } from '$lib/toast/addToast';
	import { onDestroy, onMount } from 'svelte';

	let loggedIn = false;
	let prevLoggedIn = false;
	const loggedInInterval = setInterval(() => {
		if (browser) {
			loggedIn = isLoggedIn();
			prevLoggedIn = prevLoggedIn || loggedIn;
		}
	}, 1500);

	onMount(() => {
		loggedIn = isLoggedIn();
	});
	onDestroy(() => {
		clearInterval(loggedInInterval);
	});

	$: {
		if (!loggedIn && prevLoggedIn)
			addToast({
				content: 'toast.logout',
				type: 'info',
				duration: 5000
			});
	}
</script>
