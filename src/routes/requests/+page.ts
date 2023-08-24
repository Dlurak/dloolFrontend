import { browser } from '$app/environment';
import { PUBLIC_API_URL } from '$env/static/public';

export const load = async ({ fetch, params }) => {
	if (browser) {
		const reqId = localStorage.getItem('registerRequest');
		const uri = `/auth/requests/${reqId}`;
		const url = PUBLIC_API_URL + uri;
		const response = await fetch(url).then((res) => res.json());
		return response;
	}
};
