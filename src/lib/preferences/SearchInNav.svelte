<script>
	import I18n from '$lib/I18n.svelte';
	import { setLocalstorage } from '$lib/localstorage';
	import Switch from '$lib/utils/Switch.svelte';
	import { settings } from '../../routes/stores';

	let checked = $settings.showSearchInNavbar;

	settings.subscribe((s) => (checked = s.showSearchInNavbar));
</script>

<div class="flex flex-row gap-2 items-center justify-between">
	<I18n key="settings.apperance.nav.search" />
	<Switch
		bind:checked
		on:change={() => {
			settings.update((s) => {
				s.showSearchInNavbar = checked;
				return s;
			});
			setLocalstorage('searchInNav', checked);
		}}
	/>
</div>
