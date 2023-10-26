<script>
	import { setLocalstorage } from '$lib/localstorage';
	import { settings } from '../../routes/stores';
	import I18n from '$lib/I18n.svelte';

	let checked = $settings.showTextInNavbar;
</script>

<div class="flex flex-row gap-2 items-center justify-between">
	<I18n key="settings.apperance.nav.text" />
	<input
		type="checkbox"
		id="textInNav"
		name="textInNav"
		value="textInNav"
		class="checkbox"
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
