<script lang="ts">
	import I18n from '$lib/I18n.svelte';
	import LanguageSwitcher from '$lib/LanguageSwitcher.svelte';
</script>

<div>
	<section>
		<div class="flex items-center justify-between">
			<I18n key="settings.language.language" />
			<div
				class="rounded-sm px-1 bg-light-box dark:bg-dark-box text-light-text dark:text-dark-text"
			>
				<LanguageSwitcher />
			</div>
		</div>
	</section>
</div>
