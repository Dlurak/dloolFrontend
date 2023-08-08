<script lang="ts">
	import Contact from './Contact.svelte';
	import CopyRight from './CopyRight.svelte';
	import Links from './Links.svelte';

	export let height: number;
</script>

<footer bind:clientHeight={height}>
	<CopyRight />
	<Contact />
	<Links />
</footer>

<style>
	footer {
		margin: 0;

		padding-inline: 1.5rem;
		padding-block: 1rem;

		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1rem;

		background-color: var(--secondary);
	}
</style>
