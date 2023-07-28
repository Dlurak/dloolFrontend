<script>
	import HamburgerButton from './navbar/hamburgerButton.svelte';
</script>

<nav>
	<div>Logo</div>
	<div>Links</div>
	<HamburgerButton />
</nav>

<style>
	nav {
		height: 3rem;

		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		gap: 2rem;

		padding-inline: 2rem;

		outline: 2px solid red;
	}
</style>
