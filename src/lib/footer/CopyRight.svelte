<script>
	import I18n from '$lib/I18n.svelte';
	import LanguageSwitcher from '$lib/LanguageSwitcher.svelte';
	import QuickActionButton from '$lib/QuickActionButton.svelte';
</script>

<div class="column flex-1">
	<div class="flex flex-nowrap justify-between">
		<h3><I18n key="footer.liscence" /></h3>
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
	<div class="row"><I18n key="footer.liscence.text" /></div>
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
