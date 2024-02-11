<script>
	import I18n from '$lib/I18n.svelte';
	import { getCountries } from '$lib/holidays/api/countries';
	import { getSubdivisions } from '$lib/holidays/api/subdivisions';
	import { localstorage } from 'svocal';
	import { currentLanguage } from '../../../stores';
	import { SvocalKeys } from '../../../enums/svocal';

	const countrySvocal = localstorage(SvocalKeys.HOLIDAYS_COUNTRY, 'DE');
	const subdivisionSvocal = localstorage(SvocalKeys.HOLIDAYS_STATE, 'HE');
</script>

<div>
	<section class="flex flex-col gap-4">
		<h3><I18n key="settings.local" /></h3>
		<div class="flex gap-2 items-center">
			<span class="font-semibold"><I18n key="settings.local.country" /></span>
			<select
				class="h-full bg-transparent inline-block px-4 py-2 rounded-md text-light-text dark:text-dark-text border-solid border-emerald-400 dark:border-emerald-700 border-2 w-full"
				bind:value={$countrySvocal}
			>
				<I18n>
					{#await getCountries() then countries}
						{#each countries as country}
							<option value={country.isoCode} selected={country.isoCode === $countrySvocal}>
								{(
									country.name.find((n) => n.language.toLowerCase() === $currentLanguage) ||
									country.name[0]
								).text}
							</option>
						{/each}
					{/await}
				</I18n>
			</select>
		</div>
		<I18n>
			{#await getSubdivisions($countrySvocal) then subs}
				{#if subs.length}
					<div class="flex gap-2 items-center">
						<span class="font-semibold">
							<I18n key="settings.local.subdivision" />
						</span>
						<select
							class="h-full bg-transparent inline-block px-4 py-2 rounded-md text-light-text dark:text-dark-text border-solid border-emerald-400 dark:border-emerald-700 border-2 w-full"
							bind:value={$subdivisionSvocal}
						>
							{#each subs as subdivision}
								<option
									value={subdivision.shortName}
									selected={subdivision.shortName === $subdivisionSvocal}
								>
									{(
										subdivision.name.find((n) => n.language.toLowerCase() === $currentLanguage) ||
										subdivision.name[0]
									).text}
								</option>
							{/each}
						</select>
					</div>
				{/if}
			{/await}
		</I18n>
	</section>
</div>
