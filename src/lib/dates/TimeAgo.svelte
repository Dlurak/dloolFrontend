<script lang="ts">
	import { onDestroy } from 'svelte';
	import { i, type Token } from '../../languages/i18n';

	export let timestamp: number;
	export let classes = '';

	export let type: 'edited' | 'created' = 'created';

	let timeDifference: string = getTimeDifference();

	function getTimeDifference() {
		const currentTime = Date.now();
		const timeDifference = Math.floor((currentTime - timestamp) / 1000);

		let unit: 'seconds' | 'minutes' | 'hours' | 'days' | 'weeks' | 'months' | 'years';
		let time: number;

		if (timeDifference < 60) {
			time = timeDifference;
			unit = 'seconds';
		} else if (timeDifference < 3600) {
			time = Math.floor(timeDifference / 60);
			unit = 'minutes';
		} else if (timeDifference < 86400) {
			time = Math.floor(timeDifference / 3600);
			unit = 'hours';
		} else if (timeDifference < 604800) {
			time = Math.floor(timeDifference / 86400);
			unit = 'days';
		} else if (timeDifference < 2628000) {
			time = Math.floor(timeDifference / 604800);
			unit = 'weeks';
		} else if (timeDifference < 31536000) {
			time = Math.floor(timeDifference / 2628000);
			unit = 'months';
		} else {
			time = Math.floor(timeDifference / 31536000);
			unit = 'years';
		}

		const specificString = i(`time.ago.${type}.${unit}.${time}` as Token) as string | undefined;

		const baseString = specificString || i(`time.ago.${type}.${unit}`);
		const fullString = baseString.replace('time', time.toString());
		return fullString;
	}

	const interval = setInterval(() => {
		timeDifference = getTimeDifference();
	}, 1000);

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<!-- It's ok that this isn't in a I18n tag due to the interval-->
<p class={classes}>{timeDifference}</p>
