<script>
	import LanguageSwitcher from '$lib/LanguageSwitcher.svelte';
	import QuickActionButton from '$lib/QuickActionButton.svelte';
	import { i } from '@inlang/sdk-js';
</script>

<div class="column flex-1">
	<div class="flex flex-nowrap justify-between">
		<h3>© 2023 Dlurak</h3>
		<div class="flex justify-end gap-1">
			<QuickActionButton
				iconName="bx-printer"
				focusedIconName="bxs-printer"
				on:click={() => {
					window.print();
				}}
			/>
			<LanguageSwitcher />
		</div>
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
