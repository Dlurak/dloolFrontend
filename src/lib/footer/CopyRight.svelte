<script>
	import I18n from '$lib/I18n.svelte';
	import LanguageSwitcher from '$lib/LanguageSwitcher.svelte';
	import QuickActionButton from '$lib/QuickActionButton.svelte';
	import { i } from '../../languages/i18n';
</script>

<div class="column flex-1">
	<div class="flex flex-nowrap justify-between">
		<h3><I18n key="footer.liscence" /></h3>
		<div class="flex justify-end gap-1">
			<I18n>
				<QuickActionButton
					iconName="bx-printer"
					focusedIconName="bxs-printer"
					title={i('footer.print', {}, { transform: 'capitalize' })}
					on:click={() => {
						window.print();
					}}
				/>
			</I18n>
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
