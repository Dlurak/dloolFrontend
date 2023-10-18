import type { Event } from '../../types/events';

/**
 * A function to check if an event is over
 * @param event The event to check if it's over
 * @param date The date to compare it to, defaults to the current date
 * @returns A boolean indicating whether the event is over
 */
export const isEventOver = (event: Event, date = new Date()): boolean => {
	const startDate = new Date(
		event.date.year,
		event.date.month - 1,
		event.date.day,
		event.date.hour,
		event.date.minute,
		0,
		0
	);
	const endDate = new Date(startDate.getTime() + event.duration * 1000);

	return date.getTime() > endDate.getTime();
};
