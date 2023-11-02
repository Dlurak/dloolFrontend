<script>
	import { setLocalstorage } from '$lib/localstorage';
	import { settings } from '../../stores';
	import I18n from '$lib/I18n.svelte';
	import Switch from '$lib/utils/Switch.svelte';

	let checked = $settings.showTextInNavbar;

	settings.subscribe((s) => (checked = s.showTextInNavbar));
</script>

<div class="flex flex-row gap-2 items-center justify-between">
	<I18n key="settings.apperance.nav.text" />
	<Switch
		bind:checked
		on:change={() => {
			settings.update((s) => {
				s.showTextInNavbar = checked;
				return s;
			});
			setLocalstorage('textInNav', checked);
		}}
	/>
</div>
