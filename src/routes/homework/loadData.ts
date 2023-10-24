import { page } from '$app/stores';
import { PUBLIC_API_URL } from '$env/static/public';
import type { HomeworkResponse, HomeworkWithId, HomeworkWithMongoId } from '../../types/homework';

export const loadHomework = () => {
	let newUrl = '';
	page.subscribe((value) => {
		const urlPage = value.url.searchParams.get('page');
		const searchParams = new URLSearchParams(value.url.search);
		searchParams.set('pageSize', '15');
		searchParams.set('page', urlPage || '1');
		newUrl = PUBLIC_API_URL + '/homework?' + searchParams.toString();
	});
	console.log(newUrl);

	return fetch(newUrl)
		.then((r) => r.json())
		.then((data) => {
			if (data.status === 'error') return undefined;

			const totalPageCount = data.data.totalPageCount as number;
			const homeworkData = data.data.homework.map((homework: HomeworkWithMongoId) => {
				homework.id = homework._id as string;
				delete homework._id;
				return homework;
			}) as HomeworkWithId[];

			const response = data;
			response.data = homeworkData;
			response.totalPageCount = totalPageCount;

			return response as HomeworkResponse;
		})
		.catch(() => {
			return undefined;
		});
};
