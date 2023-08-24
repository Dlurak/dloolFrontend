interface ClassDetails {
	name: string;
	school: string;
	members: string[];
}
interface ClassDetailsWithId extends ClassDetails {
	_id: string;
}

export interface ClassResponse {
	status: 'success' | 'error';
	message: string;
	data?: ClassDetailsWithId;
}
