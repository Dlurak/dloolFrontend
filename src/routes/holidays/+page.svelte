<script lang="ts">
	import I18n from '$lib/I18n.svelte';
	import Warning from '$lib/Warning.svelte';
	import DateLabel from '$lib/dates/dateLabel.svelte';
	import { loadHolidays } from '$lib/holidays/api';
	import { localstorage } from 'svocal';
	import { i, type Token } from '../../languages/i18n';
	import { currentLanguage, title } from '../../stores';
	import deepEqual from 'deep-equal';
	import { SvocalKeys } from '../../enums/svocal';

	const countrySvocal = localstorage(SvocalKeys.HOLIDAYS_COUNTRY, 'DE');
	const subdivisionSvocal = localstorage(SvocalKeys.HOLIDAYS_STATE, 'HE');

	const monthInternationalTokens = [
		'date.month.1',
		'date.month.2',
		'date.month.3',
		'date.month.4',
		'date.month.5',
		'date.month.6',
		'date.month.7',
		'date.month.8',
		'date.month.9',
		'date.month.10',
		'date.month.11',
		'date.month.12'
	] satisfies Token[];

	title.set('holiday');
</script>

<div class="pb-5 pt-1 px-1 w-full">
	<Warning
		fullWidth
		isDissmissable={{ isDissmissable: true, uniqueIdentifier: 'holidays-uncertain' }}
	>
		<I18n key="holiday.warning" />
	</Warning>
</div>

<div class="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
	{#each monthInternationalTokens as monthToken, index}
		<div class="w-full">
			{#key $currentLanguage}
				<h3>{i(monthToken, {}, { transform: 'capitalize' })}</h3>
			{/key}

			{#key $countrySvocal}
				{#key $subdivisionSvocal}
					{#await loadHolidays() then awaited}
						{#each awaited.filter((holi) => holi.startDate.month === index + 1) as holiday}
							<h4>
								{holiday.name.find(
									(name) => name.language.toLowerCase() === $currentLanguage.toLowerCase()
								)?.text}
							</h4>

							<div class="flex gap-3">
								<DateLabel date={holiday.startDate} short />
								{#if !deepEqual(holiday.startDate, holiday.endDate, { strict: false })}
									<span>-</span>
									<DateLabel date={holiday.endDate} short />
								{/if}
							</div>
						{/each}
					{/await}
				{/key}
			{/key}
		</div>
	{/each}
</div>
