import {
	dates,
	type SpecialDate,
	type specialDateRange,
	type SpecialDates
} from '../../constants/dates';

const isAfterDate = (date: SpecialDate): boolean => {
	const currentDay = new Date().getDate();
	const currentMonth = new Date().getMonth() + 1;
	return currentMonth > date.month || (currentMonth === date.month && currentDay >= date.day);
};

const isBeforeDate = (date: SpecialDate): boolean => {
	const currentDay = new Date().getDate();
	const currentMonth = new Date().getMonth() + 1;
	return currentMonth < date.month || (currentMonth === date.month && currentDay <= date.day);
};

const isDate = (date: SpecialDate): boolean => {
	const currentDay = new Date().getDate();
	const currentMonth = new Date().getMonth() + 1;
	return currentMonth === date.month && currentDay === date.day;
};

const isInRange = (date: specialDateRange): boolean => {
	const { start, end } = date;
	return (isAfterDate(start) && isBeforeDate(end)) || isDate(start) || isDate(end);
};

export const currentSpecialDates = (d: Record<SpecialDates, specialDateRange> = dates) => {
	const currentDates = Object.values(d).filter(isInRange);
	const currentDatesNames = Object.keys(d).filter((key) =>
		currentDates.includes(d[key as SpecialDates])
	);
	return currentDatesNames as SpecialDates[];
};

export const isSpecialDate = (date: SpecialDates): boolean => currentSpecialDates().includes(date);
