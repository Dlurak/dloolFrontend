import { leadingZeroDaysAndMonths } from './leadeingZeroDaysAndMonths';

export function getDateInInputFormat(date: Date) {
	return `${date.getFullYear()}-${leadingZeroDaysAndMonths(
		date.getMonth() + 1
	)}-${leadingZeroDaysAndMonths(date.getDate())}`;
}

export function getDateTimeInInputFormat(date: Date) {
	return date.toISOString().slice(0, 16);
}
