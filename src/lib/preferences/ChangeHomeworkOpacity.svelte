<script>
	import I18n from '$lib/I18n.svelte';
	import { localstorage } from 'svocal';
	import { SvocalKeys } from '../../enums/svocal';

	const store = localstorage(SvocalKeys.PREFRENCES_HOMEWORK_OPACITY, 0.5);
</script>

<div class="flex flex-row gap-2 items-center justify-between">
	<I18n key="settings.apperance.homework.opacity" />

	<span class="flex items-center gap-1.5">
		<input
			class="cursor-pointer appearance-none bg-light-accent dark:bg-dark-accent h-1 rounded-md my-4"
			type="range"
			min="0"
			max="1"
			step="0.05"
			bind:value={$store}
		/>

		<!-- Rounding is due to unprecisoun with floating point math -->
		<span>{Math.round($store * 100)}%</span>
	</span>
</div>
