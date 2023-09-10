import { PUBLIC_API_URL } from '$env/static/public';
import type { HomeworkWithId, HomeworkWithMongoId } from '../../types/homework.js';

export const load = async ({ fetch, url }) => {
	const urlPage = url.searchParams.get('page');

	const searchParams = new URLSearchParams(url.search);
	searchParams.set('pageSize', '15');
	searchParams.set('page', urlPage || '1');
	const newUrl = PUBLIC_API_URL + '/homework?' + searchParams.toString();

	const rawData = await fetch(newUrl)
		.then((res) => res.json())
		.catch(() => {
			return {
				status: 'error'
			};
		});

	if (rawData.status === 'error') return undefined;

	const totalPageCount = rawData.data.totalPageCount;
	const data = rawData.data.homework.map((homework: HomeworkWithMongoId) => {
		homework.id = homework._id as string;
		delete homework._id;
		return homework;
	}) as HomeworkWithId[];

	const response = rawData;
	response.data = data;
	response.totalPageCount = totalPageCount;

	return response;
};
