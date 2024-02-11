import type { CustomDate } from '../../../types/customDate';
import { localstorage } from 'svocal';
import { createDate } from '$lib/dates/createDateObject';
import { get } from 'svelte/store';

import { z } from 'zod';
import { openHolidayResponseScheme, type HolidayResponse } from './scheme';
import { SvocalKeys } from '../../../enums/svocal';

interface FetchHolidaysParams {
	country: string;
	from: CustomDate;
	due: CustomDate;
}

export const fetchHolidays = async ({ country, from, due }: FetchHolidaysParams) => {
	const fromString = `${from.year}-${from.month}-${from.day}`;
	const dueString = `${due.year}-${due.month}-${due.day}`;
	const urlSchool = `https://openholidaysapi.org/SchoolHolidays?countryIsoCode=${country}&validFrom=${fromString}&validTo=${dueString}`;
	const urlPublic = `https://openholidaysapi.org/PublicHolidays?countryIsoCode=${country}&validFrom=${fromString}&validTo=${dueString}`;

	const rawResSchool = await fetch(urlSchool).then((r) => r.json());
	const rawResPublic = await fetch(urlPublic).then((r) => r.json());

	const schemeArray = z.array(openHolidayResponseScheme);
	return schemeArray.parse([...rawResPublic, ...rawResSchool]);
};

const filterHolidays = (holidays: HolidayResponse[], subDivision: string) => {
	return holidays.filter((holiday) => {
		if (holiday.nationwide) return true;
		if (holiday.subdivisions?.some((sub) => sub.shortName === subDivision)) return true;

		return false;
	});
};

export const loadHolidays = async () => {
	const now = new Date();

	const halfAYearAgo = new Date();
	halfAYearAgo.setDate(now.getDate() - 180);
	const inHalfAYear = new Date();
	inHalfAYear.setDate(now.getDate() + 180);

	const country = localstorage(SvocalKeys.HOLIDAYS_COUNTRY, 'DE');

	return filterHolidays(
		await fetchHolidays({
			country: get(country),
			from: createDate(halfAYearAgo),
			due: createDate(inHalfAYear)
		}),
		get(localstorage(SvocalKeys.HOLIDAYS_STATE, 'HE'))
	).map((res) => ({
		...res,
		startDate: createDate(new Date(res.startDate)),
		endDate: createDate(new Date(res.endDate))
	}));
};
