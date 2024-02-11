import { get } from 'svelte/store';
import { z } from 'zod';
import { currentLanguage } from '../../../stores';
import { subdivisionScheme } from './scheme';

export const getSubdivisions = async (country: string) => {
	const url = `https://openholidaysapi.org/Subdivisions?countryIsoCode=${country}&languageIsoCode=${get(
		currentLanguage
	).toUpperCase()}`;
	const rawRes = await fetch(url).then((r) => r.json());

	const arrayScheme = z.array(subdivisionScheme);
	return arrayScheme.parse(rawRes);
};
