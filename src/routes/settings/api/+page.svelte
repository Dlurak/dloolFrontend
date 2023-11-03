<script>
	import I18n from '$lib/I18n.svelte';
	import Warning from '$lib/Warning.svelte';
	import Api from '$lib/preferences/Api.svelte';
</script>

<div>
	<section class=" flex flex-col gap-4">
		<div>
			<h3><I18n key="settings.api" /></h3>
			<div class="p-3">
				<Warning>
					<I18n key="settings.api.warning" />
				</Warning>
			</div>
		</div>

		<Api />
	</section>
</div>
