<script>
	import I18n from '$lib/I18n.svelte';
	import { localstorage } from 'svocal';
	import { SvocalKeys } from '../../enums/svocal';

	const store = localstorage(SvocalKeys.PREFERENCES_HOMEWORK_PER_PAGE, 15);
</script>

<div class="flex flex-row gap-2 items-center justify-between">
	<I18n key="settings.homework.amount" />

	<span class="flex items-center gap-1.5">
		<input
			class="cursor-pointer appearance-none bg-light-accent dark:bg-dark-accent h-1 rounded-md my-4"
			type="range"
			min="1"
			max="100"
			step="1"
			bind:value={$store}
		/>

		<span>{$store}</span>
	</span>
</div>
