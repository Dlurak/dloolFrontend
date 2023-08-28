<script lang="ts">
	import PrintingFooter from '$lib/PrintingFooter.svelte';
	import Contact from './Contact.svelte';
	import CopyRight from './CopyRight.svelte';
	import Links from './Links.svelte';

	export let height: number;
</script>

<footer bind:clientHeight={height} class="flex flex-col items-stretch gap-7">
	<div class="flex flex-col md:flex-row justify-start gap-7">
		<CopyRight />
		<Contact />
	</div>
	<Links />
</footer>
<PrintingFooter />

<style>
	footer {
		margin: 0;

		padding-inline: 1.5rem;
		padding-block: 1rem;

		background-color: var(--secondary);
	}
</style>
