import type { CustomDate, CustomDateTime } from '../../types/customDate';

export function createDate(d: Date): CustomDate {
	return {
		day: d.getUTCDate(),
		month: d.getUTCMonth() + 1,
		year: d.getUTCFullYear()
	};
}

export function createDateTime(d: Date): CustomDateTime {
	return {
		...createDate(d),
		hour: d.getUTCHours(),
		minute: d.getUTCMinutes()
	};
}

export function createDateFromTimestamp(timestamp: number): CustomDate {
	return createDate(new Date(timestamp));
}
