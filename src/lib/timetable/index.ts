import { createDate } from '$lib/dates/createDateObject';
import { getCurrentWeekdayAbbreviation } from '$lib/dates/dataWeekday';
import { mapValues } from '$lib/helpers/mapValues';
import { emptyTimeTable, type WeekDay } from '../../constants/weekDays';
import { timetable } from '../../stores';

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

export const nextCustomDateForWeekday = (day: WeekDay) => {
	const weekdays = Object.keys(times);

	const todayIndex = weekdays.indexOf(getCurrentWeekdayAbbreviation());
	const dayIndex = weekdays.indexOf(day);

	const daysToNext = dayIndex - todayIndex;

	const currently = new Date();
	currently.setDate(currently.getDate() + daysToNext);

	if (currently <= new Date()) {
		currently.setDate(currently.getDate() + 7);
	}

	return createDate(currently);
};
