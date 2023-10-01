export interface CustomDate {
	year: number;
	month: number;
	day: number;
}

interface CustomTime {
	hour: number;
	minute: number;
}

export interface CustomDateTime extends CustomDate, CustomTime {}
