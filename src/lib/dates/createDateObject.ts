import type { CustomDate } from "../../types/customDate";

export function createDate(d: Date): CustomDate {
	return {
		day: d.getDate(),
		month: d.getMonth() + 1,
		year: d.getFullYear()
	};
}
