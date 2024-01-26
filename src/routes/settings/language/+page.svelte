<script lang="ts">
	import I18n from '$lib/I18n.svelte';
	import LanguageSwitcher from '$lib/LanguageSwitcher.svelte';
	import LibreTranslateToken from '$lib/libretranslate/Token.svelte';
	import LibreTranslateUrl from '$lib/libretranslate/Url.svelte';
	import Switch from '$lib/utils/Switch.svelte';
	import { localstorage } from 'svocal';
	import { SvocalKeys } from '../../../enums/svocal';

	let useLibreTranslate = localstorage(SvocalKeys.LIBRETRANSLATE_ENABLE, false);
</script>

<div>
	<section>
		<section class="flex items-center justify-between">
			<I18n key="settings.language.language" />
			<div
				class="rounded-sm px-1 bg-light-box dark:bg-dark-box text-light-text dark:text-dark-text"
			>
				<LanguageSwitcher />
			</div>
		</section>
		<hr />
		<section class="flex flex-col gap-3">
			<div>
				<h4>LibreTranslate</h4>
				<p>
					Die obere Einstellung betrifft alles außer Nutzer-generierte inhalte.<br />
					Diese können via <a href="https://libretranslate.com/">LibreTranslate</a> übersetzt werden.
				</p>
			</div>

			<div class="flex items-center justify-between">
				<I18n key="settings.language.libretranslate.enable" />
				<Switch bind:checked={$useLibreTranslate} />
			</div>

			{#if $useLibreTranslate}
				<LibreTranslateUrl />
				<LibreTranslateToken />
			{/if}
		</section>
	</section>
</div>
