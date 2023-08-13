import type { CustomDate } from './customDate';

export interface Assignment {
	subject: string;
	description: string;
	due: CustomDate;
}

export interface Homework {
	creator: string;
	class: string;
	createdAt: number;
	from: CustomDate;
	assignments: Assignment[];
}

export interface HomeworkResponse {
	status: 'success';
	message: 'Homework found';
	data: Homework[];
}
