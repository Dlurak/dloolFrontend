export function createDate(d: Date) {
	return {
		day: d.getDate(),
		month: d.getMonth() + 1,
		year: d.getFullYear()
	};
}
