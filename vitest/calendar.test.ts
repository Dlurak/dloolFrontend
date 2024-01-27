import { expect, test } from 'vitest';
import {
	getMonthLength,
	getAmountOfPaddingDays,
	getNextMonth,
	getPrevMonth
} from '../src/lib/calendar/utils';

test('getmonthlength', () => {
	expect(
		getMonthLength({
			day: 20,
			month: 2,
			year: 2020
		})
	).toBe(29);

	expect(
		getMonthLength({
			day: 20,
			month: 1,
			year: 2024
		})
	).toBe(31);
});

test('get amount of padding days', () => {
	expect(
		getAmountOfPaddingDays({
			day: 20,
			month: 2,
			year: 2020
		})
	).toBe(5);

	expect(
		getAmountOfPaddingDays({
			day: 20,
			month: 3,
			year: 2020
		})
	).toBe(6);

	expect(
		getAmountOfPaddingDays({
			day: 20,
			month: 4,
			year: 2020
		})
	).toBe(2);

	expect(
		getAmountOfPaddingDays({
			day: 20,
			month: 5,
			year: 2020
		})
	).toBe(4);

	expect(
		getAmountOfPaddingDays({
			day: 20,
			month: 1,
			year: 2024
		})
	).toBe(0);
});

test('get next and previous month', () => {
	expect(
		getPrevMonth({
			day: 2,
			month: 1,
			year: 2024
		})
	).toEqual({
		month: 12,
		year: 2023
	});

	expect(
		getPrevMonth({
			day: 2,
			month: 6,
			year: 2024
		})
	).toEqual({
		month: 5,
		year: 2024
	});

	expect(
		getNextMonth({
			day: 2,
			month: 12,
			year: 2024
		})
	).toEqual({
		month: 1,
		year: 2025
	});

	expect(
		getNextMonth({
			day: 2,
			month: 6,
			year: 2024
		})
	).toEqual({
		month: 7,
		year: 2024
	});
});
