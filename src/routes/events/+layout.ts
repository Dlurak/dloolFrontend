import { PUBLIC_API_URL } from '$env/static/public';
import { calendarEvents } from '../stores.js';

export const load = async ({ fetch, url }) => {
	// TODO: Replace with real pagination data
	// TODO: Replace with real school and class

	const originalQuery = url.searchParams;

	const schoolUrl = originalQuery.get('school') || '';
	const classNameUrl = originalQuery.get('class') || '';
	const pageUrl = originalQuery.get('page') || '1';
	const pageSizeUrl = originalQuery.get('pageSize') || '15';

	const searchParams = new URLSearchParams({
		school: schoolUrl,
		class: classNameUrl,
		page: pageUrl,
		pageSize: pageSizeUrl
	});

	const reqUrl = `${PUBLIC_API_URL}/events?${searchParams.toString()}`;
	const res = await fetch(reqUrl);
	const data = await res.json();
	if (data.status === 'error') return { dataAvailable: false };
	calendarEvents.set(data.data.events);
	return {
		eventDataAvailable: true,
		data: data.data
	};
};
