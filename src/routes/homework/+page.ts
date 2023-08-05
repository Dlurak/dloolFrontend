import { PUBLIC_API_URL } from '$env/static/public';

export const load = async ({ fetch, url }) => {
	const newUrl = PUBLIC_API_URL + '/homework/all' + url.search;

	return fetch(newUrl).then((res) => res.json());
};
