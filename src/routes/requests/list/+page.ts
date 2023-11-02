import { browser } from '$app/environment';
import { backendUrl as backendUrlStore } from '$lib/../stores';
import { isLoggedIn } from '$lib/helpers/isLoggedIn.js';
import type { RequestsResponse } from '../../../types/request.js';

let backendUrl = '';
backendUrlStore.subscribe((url) => (backendUrl = url));

export const load = async ({ fetch }) => {
	if (browser) {
		// check if the user is logged in
		const loggedIn = isLoggedIn();

		if (!loggedIn) return null;

		const uri = '/auth/requests?status=p';
		const url = backendUrl + uri;
		const response: RequestsResponse = await fetch(url, {
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('token')
			}
		}).then((res) => res.json());
		return response;
	}
};
