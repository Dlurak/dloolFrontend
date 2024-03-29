import { page } from '$app/stores';
import { backendUrl as backendUrlStore } from '$lib/../stores';
import { localstorage } from 'svocal';
import type { HomeworkResponse, HomeworkWithId, HomeworkWithMongoId } from '../../types/homework';
import { get } from 'svelte/store';
import { SvocalKeys } from '../../enums/svocal';

let backendUrl = '';
backendUrlStore.subscribe((url) => (backendUrl = url));

export const loadHomework = () => {
	let newUrl = '';
	page.subscribe((value) => {
		const urlPage = value.url.searchParams.get('page');
		const searchParams = new URLSearchParams(value.url.search);
		searchParams.set(
			'pageSize',
			`${get(localstorage(SvocalKeys.PREFERENCES_HOMEWORK_PER_PAGE, 15))}`
		);
		searchParams.set('page', urlPage || '1');
		newUrl = backendUrl + '/homework?' + searchParams.toString();
	});

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
