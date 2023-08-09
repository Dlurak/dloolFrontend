<script>
	import LanguageSwitcher from '$lib/LanguageSwitcher.svelte';
</script>

<div class="column">
	<div class="row">
		<h3>© 2023 Dlurak</h3>
		<LanguageSwitcher />
	</div>
	<div class="row">Licensed under the GNU General Public License, Version 2.</div>
</div>

<style>
	.column,
	.row {
		display: flex;
		flex-wrap: nowrap;
	}

	.column {
		flex-direction: column;
	}

	.row {
		justify-content: space-between;
	}
</style>
