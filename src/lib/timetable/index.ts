import { createDate } from '$lib/dates/createDateObject';
import { getWeekdayAbbreviationByDate } from '$lib/dates/dataWeekday';
import { mapValues } from '$lib/helpers/mapValues';
import { emptyTimeTable, type WeekDay } from '../../constants/weekDays';
import { timetable } from '../../stores';
import type { CustomDate } from '../../types/customDate';

let times = emptyTimeTable;

timetable.subscribe((value) => {
	times = value;
});

export const nextWeekdayForSubject = (day: WeekDay, subject: string) => {
	const mapped = mapValues(times, (localSubj) => localSubj.includes(subject));
	const today = new Date().getDay();
	const weekLength = Object.values(times).length;

	for (let i = today; i < today + weekLength; i++) {
		const dayIndex = i % weekLength;
		const dayName = Object.keys(mapped)[dayIndex] as WeekDay;

		if (mapped[dayName]) {
			return dayName;
		}
	}

	return day;
};

export const nextCustomDateForWeekday = (day: WeekDay, start: CustomDate) => {
	const weekdays = Object.keys(times);

	const todayIndex = weekdays.indexOf(getWeekdayAbbreviationByDate(start));
	const dayIndex = weekdays.indexOf(day);

	const daysToNext = dayIndex - todayIndex;

	const endDate = new Date(start.year, start.month - 1, start.day);
	endDate.setDate(endDate.getDate() + daysToNext);

	const currently = new Date();
	currently.setHours(0, 0, 0, 0);

	if (endDate <= currently) {
		endDate.setDate(endDate.getDate() + 7);
	}
	return createDate(endDate);
};
