import type { WeekDay } from '../../constants/weekDays';
import { i, type T, type Token } from '../../languages/i18n';
import type { CustomDate } from '../../types/customDate';

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

const tokenShort = [
	'date.sunday.short',
	'date.monday.short',
	'date.tuesday.short',
	'date.wednesday.short',
	'date.thursday.short',
	'date.friday.short',
	'date.saturday.short'
] satisfies Token[];
type WeekdayTranslationShort = T<(typeof tokenShort)[number]>;

type WeekdayTrans<short extends boolean> = short extends true
	? WeekdayTranslation
	: WeekdayTranslationShort;

/**
 * A function to give a weekday by name from a date.
 * It's important to use this function inside of an <I18n> component so that the language switches correctly.
 * @param date The date to get the weekday from
 * @returns A translation of the weekday
 */
export function getWeekdayByDate<Tshort extends boolean>(
	date: { day: number; month: number; year: number },
	isShort: Tshort = false as Tshort
) {
	const dateObj = new Date(date.year, date.month - 1, date.day);

	const weekdays = (isShort ? tokenShort : token).map((key) => i(key));

	return weekdays[dateObj.getDay()] as WeekdayTrans<Tshort>;
}

/**
 * A function to give a weekday by abbreviation.
 * @param abbreviation The abbreviation of the weekday
 * @returns A translation of the weekday
 */
export function getWeekdayByAbbreviation(abbreviation: WeekDay) {
	const longWeekdayToken = (
		{
			mo: 'date.monday',
			tu: 'date.tuesday',
			we: 'date.wednesday',
			th: 'date.thursday',
			fr: 'date.friday',
			sa: 'date.saturday',
			su: 'date.sunday'
		} satisfies Record<WeekDay, Token>
	)[abbreviation];

	return i(longWeekdayToken, {}, {
		transform: 'capitalize'
	} as const);
}

export const getWeekdayAbbreviationByDate = (date: CustomDate) => {
	const dateObj = new Date(date.year, date.month - 1, date.day);
	const weekdayIndex = dateObj.getDay();

	switch (weekdayIndex) {
		case 0:
			return 'su';
		case 1:
			return 'mo';
		case 2:
			return 'tu';
		case 3:
			return 'we';
		case 4:
			return 'th';
		case 5:
			return 'fr';
		case 6:
			return 'sa';
		default:
			return 'mo';
	}
};

export const getWeekdays = () => token.map((key) => i(key)) as WeekdayTranslation[];
