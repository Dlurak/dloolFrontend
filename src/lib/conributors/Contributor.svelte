<script lang="ts">
	import type { ContributorType } from '../../types/Contributors';
	import ContributorPopOver from './ContributorPopOver.svelte';

	export let contri: ContributorType;

	let showPopover = false;
	let popoverTop = 0;
	let popoverLeft = 0;
</script>

<a
	href={contri.html_url}
	on:mouseenter={() => (showPopover = true)}
	on:mousemove={(e) => {
		popoverTop = e.clientY + 10;
		popoverLeft = e.clientX + 10;
	}}
	on:mouseleave={() => (showPopover = false)}
>
	<img src={contri.avatar_url} alt={contri.login} height="128" width="128" class="rounded-full" />
</a>

<ContributorPopOver contributor={contri} show={showPopover} top={popoverTop} left={popoverLeft} />
