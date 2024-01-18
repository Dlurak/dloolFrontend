<script>
	import I18n from '$lib/I18n.svelte';
	import { setLocalstorage } from '$lib/localstorage';
	import Switch from '$lib/utils/Switch.svelte';
	import { settings } from '../../stores';

	let checked = $settings.useTimeTableForAutcomplete;

	settings.subscribe((s) => (checked = s.useTimeTableForAutcomplete));
</script>

<div class="flex flex-row gap-2 items-center justify-between">
	<I18n key="settings.timetable.useForAutoComplete" />
	<Switch
		bind:checked
		on:change={() => {
			settings.update((s) => {
				s.useTimeTableForAutcomplete = checked;
				return s;
			});
			setLocalstorage('useTimeTable', checked);
		}}
	/>
</div>
