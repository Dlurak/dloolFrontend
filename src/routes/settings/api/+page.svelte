<script>
	import I18n from '$lib/I18n.svelte';
	import Api from '$lib/preferences/Api.svelte';
</script>

<div>
	<section class=" flex flex-col gap-4">
		<div>
			<h3><I18n key="settings.api" /></h3>
			<div class="p-3">
				<div
					class="border-yellow-600 dark:border-yellow-400 bg-yellow-300 bg-opacity-20 border-2 border-solid rounded-md flex gap-2 items-center px-3 py-2 warning-box"
				>
					<i class="bx bx-error text-4xl" />
					<span>
						<I18n key="settings.api.warning" />
					</span>
				</div>
			</div>
		</div>

		<Api />
	</section>
</div>

<style>
	.warning-box {
		box-shadow: 0 0 0.5rem 0 rgb(250, 204, 21);
	}
</style>
