import { backendUrl as backendUrlStore } from '$lib/../stores';
import { calendarEvents } from '../../stores.js';

let backendUrl = '';
backendUrlStore.subscribe((url) => (backendUrl = url));

export const load = async ({ fetch, url }) => {
	// TODO: Replace with real pagination data

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

	const reqUrl = `${backendUrl}/events?${searchParams.toString()}`;
	const res = await fetch(reqUrl);
	const data = await res.json();
	if (data.status === 'error') return { dataAvailable: false };
	calendarEvents.set(data.data.events);
	return {
		eventDataAvailable: true,
		data: data.data
	};
};
