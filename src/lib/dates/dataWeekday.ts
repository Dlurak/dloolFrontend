import { i } from '@inlang/sdk-js';

export function getWeekdayByDate(date: { day: number; month: number; year: number }) {
	const dateObj = new Date(date.year, date.month - 1, date.day);

	const weekdays = [
		i('date.sunday'),
		i('date.monday'),
		i('date.tuesday'),
		i('date.wednesday'),
		i('date.thursday'),
		i('date.friday'),
		i('date.saturday')
	];

	return weekdays[dateObj.getDay()];
}
