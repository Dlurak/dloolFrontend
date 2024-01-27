import type { CustomDate } from '../../types/customDate';
import type { IntRange } from '../../types/utils';

export const getMonthLength = ({ year, month }: CustomDate) => new Date(year, month, 0).getDate();

export const getAmountOfPaddingDays = ({ year, month }: CustomDate) => {
	const firstDayOfMonth = new Date(year, month - 1);
	const weekday = firstDayOfMonth.getDay();

	const raw = weekday - 1;
	return raw === -1 ? 6 : raw;
};

export const getPrevMonth = ({ year, month }: CustomDate) => {
	const prevMonth = new Date(year, month - 2);

	const returnMonth = (prevMonth.getMonth() + 1) as IntRange<1, 12>;
	return {
		year: prevMonth.getFullYear(),
		month: returnMonth
	};
};

export const getNextMonth = ({ year, month }: CustomDate) => {
	const nextMonth = new Date(year, month);

	const returnMonth = (nextMonth.getMonth() + 1) as IntRange<1, 12>;
	return {
		year: nextMonth.getFullYear(),
		month: returnMonth
	};
};
