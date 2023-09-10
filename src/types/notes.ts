import type { CustomDate } from './customDate';

export interface Note {
	_id: string;
	creator: string;
	createdAt: number;
	title: string;
	content: string;
	due: CustomDate;
	visibility: 'public' | 'private';
	class: string | null;
}

export interface NoteResponse {
	data: {
		pageCount: number;
		notes: Note[];
	};
	noteDataAvailable: true;
}
