import { i, type T, type Token } from '../../languages/i18n';

const token = [
	'date.sunday',
	'date.monday',
	'date.tuesday',
	'date.wednesday',
	'date.thursday',
	'date.friday',
	'date.saturday'
] satisfies Token[];
type WeekdayTranslation = T<(typeof token)[number]>;

/**
 * A function to give a weekday by name from a date.
 * It's important to use this function inside of an <I18n> component so that the language switches correctly.
 * @param date The date to get the weekday from
 * @returns A translation of the weekday
 */
export function getWeekdayByDate(date: { day: number; month: number; year: number }) {
	const dateObj = new Date(date.year, date.month - 1, date.day);

	const weekdays = token.map((key) => i(key));

	return weekdays[dateObj.getDay()] as WeekdayTranslation;
}

export const getWeekdays = () => token.map((key) => i(key)) as WeekdayTranslation[];
