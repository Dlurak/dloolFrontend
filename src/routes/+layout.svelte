<script>
	import Navbar from '$lib/Navbar.svelte';
</script>

<Navbar />

<main>
	<slot />
</main>

<style>
	main {
		margin-inline: 1.5rem;
		margin-block: 1rem;

		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
