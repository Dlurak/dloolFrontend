<script>
	import Logo from './Logo.svelte';
	import HamburgerButton from './navbar/hamburgerButton.svelte';
</script>

<nav>
	<Logo />
	<ul>
		<li>
			<i class="bx bx-user" />
		</li>
	</ul>
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
