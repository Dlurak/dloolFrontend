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
