<script>
	import { getLocalstorage, setLocalstorage } from '$lib/localstorage';
	import { onMount } from 'svelte';
	import { settings } from '../../routes/stores';
	import I18n from '$lib/I18n.svelte';

	let textInNav = true;
	let checked = true;

	onMount(() => {
		textInNav = getLocalstorage('textInNav', true);
		checked = textInNav;
		settings.update((s) => {
			s.showTextInNavbar = textInNav;
			return s;
		});
	});
</script>

<div class="flex flex-row gap-2 items-center justify-between">
	Texte in der Navigation anzeigen
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
