import { PUBLIC_API_URL } from '$env/static/public';
import type { ClassResponse } from '../../types/classes';

export async function getClassById(id: string) {
	const uri = `/classes/${id}`;
	const url = PUBLIC_API_URL + uri;

	const res = await fetch(url);
	const response: ClassResponse = await res.json();
	return response;
}
