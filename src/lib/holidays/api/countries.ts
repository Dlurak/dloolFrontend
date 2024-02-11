import { z } from 'zod';
import { get } from 'svelte/store';
import { currentLanguage } from '../../../stores';
import { countryListScheme } from './scheme';

export const getCountries = async () => {
	const url = `https://openholidaysapi.org/Countries?languageIsoCode=${get(
		currentLanguage
	).toUpperCase()}`;
	const rawJson = await fetch(url).then((res) => res.json());

	const arrayScheme = z.array(countryListScheme);
	return arrayScheme.parse(rawJson);
};
