<script>
	import I18n from '$lib/I18n.svelte';
	import Switch from '$lib/utils/Switch.svelte';
	import { localstorage } from 'svocal';
	import { SvocalKeys } from '../../../enums/svocal';

	const checked = localstorage(SvocalKeys.TIMETABLE_AUT_SORT, true);
</script>

<div class="flex flex-row gap-2 items-center justify-between">
	<I18n key="settings.timetable.useForAutoSort" />
	<Switch bind:checked={$checked} />
</div>
