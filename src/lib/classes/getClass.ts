import { backendUrl as backendUrlStore } from '$lib/../stores';
import type { ClassResponse } from '../../types/classes';

let backendUrl = '';
backendUrlStore.subscribe((url) => (backendUrl = url));

export async function getClassById(id: string) {
	const uri = `/classes/${id}`;
	const url = backendUrl + uri;

	const res = await fetch(url);
	const response: ClassResponse = await res.json();
	return response;
}
