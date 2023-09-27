import type { CustomDate, CustomDateTime } from '../../types/customDate';

export function createDate(d: Date): CustomDate {
	return {
		day: d.getDate(),
		month: d.getMonth() + 1,
		year: d.getFullYear()
	};
}

export function createDateTime(d: Date): CustomDateTime {
	return {
		...createDate(d),
		hour: d.getHours(),
		minute: d.getMinutes()
	};
}

export function createDateFromTimestamp(timestamp: number): CustomDate {
	return createDate(new Date(timestamp));
}
