import { PUBLIC_API_URL } from '$env/static/public';

export const load = async ({ fetch }) => {
	// TODO: Replace with real pagination data
	// TODO: Replace with real school and class

	const reqUrl = `${PUBLIC_API_URL}/events?page=1&pageSize=15`;

	const res = await fetch(reqUrl);
	const data = await res.json();
	if (data.status === 'error') return { dataAvailable: false };
	return {
		eventDataAvailable: true,
		data: data.data
	};
};
