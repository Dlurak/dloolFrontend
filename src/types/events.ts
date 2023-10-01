/*

{"_id":"650a069d17262de74d12a8f1","title":"The first ever title","description":"The first ever description","date":{"year":2023,"month":10,"day":1,"hour":10,"minute":0},"duration":1,"subject":"Mathe","editors":["dlurak"],"class":"10b","editedAt":[1695155869677],"school":"Lioba"}

*/

import type { CustomDateTime } from './customDate';

export interface Event {
	_id: string;
	title: string;
	description: string;
	date: CustomDateTime;
	duration: number;
	subject: string;
	editors: string[];
	class: string;
	editedAt: number[];
	school: string;
	location?: string;
}

export interface EventResponse {
	data: {
		pageCount: number;
		events: Event[];
	};
	eventDataAvailable: true;
}
