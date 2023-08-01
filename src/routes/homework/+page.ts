import { PUBLIC_API_URL } from '$env/static/public';

export const load = async ({ fetch }) => {
	const url =
		PUBLIC_API_URL +
		'/homework?' +
		new URLSearchParams({
			class: 'class',
			school: 'school'
		}).toString();

	return fetch(url).then((res) => res.json());
};
