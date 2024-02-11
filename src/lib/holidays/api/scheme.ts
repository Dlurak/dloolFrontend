import { z } from 'zod';

const isInBetween = (min: number, number: number, max: number) => {
	const isBiggerMin = number > min;
	const isSmallerMax = number < max;

	return isSmallerMax && isBiggerMin;
};

const validateDateString = (dateString: string) => {
	const [year, month, day] = dateString.split('-').map((n) => parseInt(n));

	return isInBetween(2_000, year, 3_000) && isInBetween(0, month, 13) && isInBetween(0, day, 32);
};

const holidayType = [
	z.literal('Public'),
	z.literal('Bank'),
	z.literal('National'),
	z.literal('Regional'),
	z.literal('Local'),
	z.literal('School'),
	z.literal('BackToSchool'),
	z.literal('EndOfLessons')
] as const;

export const openHolidayResponseScheme = z.object({
	id: z.string(),
	startDate: z.string().refine(validateDateString),
	endDate: z.string().refine(validateDateString),
	type: z.union(holidayType),
	name: z.array(
		z.object({
			language: z.string().length(2),
			text: z.string()
		})
	),
	nationwide: z.boolean(),
	subdivisions: z.optional(
		z.array(
			z.object({
				code: z.string(),
				shortName: z.string()
			})
		)
	)
});

export type HolidayResponse = z.TypeOf<typeof openHolidayResponseScheme>;

const isoCodeRegex = /^[A-Z]{2}$/;

export const countryListScheme = z.object({
	isoCode: z.string().regex(isoCodeRegex),
	name: z.array(
		z.object({
			language: z.string().regex(isoCodeRegex),
			text: z.string()
		})
	),
	officialLanguages: z.array(z.string().regex(isoCodeRegex))
});

export const subdivisionScheme = z.object({
	code: z.string(),
	isoCode: z.string(),
	shortName: z.string(),
	category: z.array(
		z.object({
			language: z.string(),
			text: z.string()
		})
	),
	name: z.array(
		z.object({
			language: z.string(),
			text: z.string()
		})
	),
	officialLanguages: z.array(z.string())
});
