import { PUBLIC_API_URL } from '$env/static/public';
import type { HomeworkWithId, HomeworkWithMongoId } from '../../types/homework.js';

export const load = async ({ fetch, url }) => {
	const newUrl = PUBLIC_API_URL + '/homework/all' + url.search;

	const rawData = await fetch(newUrl).then((res) => res.json());

	if (rawData.status === 'error') return undefined;
	// map data.data[]._id to data.data[].id
	const data = rawData.data.map((homework: HomeworkWithMongoId) => {
		homework.id = homework._id as string;
		delete homework._id;
		return homework;
	}) as HomeworkWithId[];

	const response = rawData;
	response.data = data;

	return response;
};
