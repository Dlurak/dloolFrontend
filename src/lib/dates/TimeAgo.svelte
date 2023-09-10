<script lang="ts">
	import { onDestroy } from 'svelte';

	export let timestamp: number;

	let timeDifference: string = getTimeDifference();

	function getTimeDifference() {
		const currentTime = Date.now();
		const timeDifference = Math.floor((currentTime - timestamp) / 1000);

		if (timeDifference < 60) {
			return `${timeDifference} Seconds ago`;
		} else if (timeDifference < 3600) {
			const minutes = Math.floor(timeDifference / 60);
			return `${minutes} Minutes ago`;
		} else if (timeDifference < 86400) {
			const hours = Math.floor(timeDifference / 3600);
			return `${hours} Hours ago`;
		} else {
			const months = Math.floor(timeDifference / 2592000); // Assuming 30 days per month
			return `${months} Months ago`;
		}
	}

	const interval = setInterval(() => {
		timeDifference = getTimeDifference();
	}, 1000);

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<p>{timeDifference}</p>
