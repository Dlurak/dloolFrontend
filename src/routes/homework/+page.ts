import { PUBLIC_API_URL } from '$env/static/public';
import type { HomeworkWithId } from '../../types/homework.js';

export const load = async ({ fetch, url }) => {
	const newUrl = PUBLIC_API_URL + '/homework/all' + url.search;

	const rawData = await fetch(newUrl).then((res) => res.json());
	
	// map data.data[]._id to data.data[].id
	const data = rawData.data.map((homework: any) => {
		homework.id = homework._id;
		delete homework._id;
		return homework;
	}) as HomeworkWithId[];

	let response = rawData;
	response.data = data;

	return response;
};
