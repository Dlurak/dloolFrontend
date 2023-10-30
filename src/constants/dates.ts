import type { IntRange } from '../types/utils';

export type SpecialDate = {
	month: IntRange<0, 13>;
	day: IntRange<0, 32>;
};

export type specialDateRange = {
	start: SpecialDate;
	end: SpecialDate;
};

const specialDateNames = ['helloween', 'christmas'] as const;

export type SpecialDates = (typeof specialDateNames)[number];

export const dates: Record<SpecialDates, specialDateRange> = {
	helloween: {
		start: {
			month: 10,
			day: 29
		},
		end: {
			month: 11,
			day: 1
		}
	},
	christmas: {
		start: {
			month: 12,
			day: 22
		},
		end: {
			month: 12,
			day: 26
		}
	}
};
