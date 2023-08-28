<script>
	import LanguageSwitcher from '$lib/LanguageSwitcher.svelte';
	import { i } from '@inlang/sdk-js';
</script>

<div class="column flex-1">
	<div class="row">
		<h3>© 2023 Dlurak</h3>
		<LanguageSwitcher />
	</div>
	<div class="row">{i('footer.liscence.text')}</div>
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
