export interface UserDetails {
	name: string;
	username: string;
	createdAt: number;
	school: string;
	acceptedClasses: string[];
}

export type RequestStatus = 'pending' | 'accepted' | 'rejected';

export interface RequestData {
	userDetails: UserDetails;
	classId: string;
	createdAt: number;
	status: RequestStatus;
	processedBy: string | null;
}

export interface RequestResponse {
	status: 'success' | 'error';
	message: 'Request found' | 'Invalid id' | 'Request not found';
	data?: RequestData;
}

export interface RequestsData extends RequestData {
	_id: string;
}
export interface RequestsResponse {
	status: 'success' | 'error';
	message: string;
	data?: RequestsData[];
}
