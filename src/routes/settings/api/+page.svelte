<script>
	import I18n from '$lib/I18n.svelte';
	import Api from '$lib/preferences/Api.svelte';
</script>

<div>
	<section class=" flex flex-col gap-4">
		<div>
			<h3><I18n key="settings.api" /></h3>
			<span><I18n key="settings.api.warning" /></span>
		</div>

		<Api />
	</section>
</div>
