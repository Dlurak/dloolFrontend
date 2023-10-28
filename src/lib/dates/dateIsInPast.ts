import type { CustomDate } from '../../types/customDate';

export const dateIsInPast = (date: CustomDate) => {
	const now = new Date();
	const customDate = new Date(date.year, date.month - 1, date.day); // month should be 0-based in JavaScript

	return customDate < now;
};
