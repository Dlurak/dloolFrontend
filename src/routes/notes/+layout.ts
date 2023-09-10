import { browser } from '$app/environment';
import { PUBLIC_API_URL } from '$env/static/public';
import type { Note, NoteResponse } from '../../types/notes.js';

const getNameOfClass = (classId: string) => {
	const url = `${PUBLIC_API_URL}/classes/${classId}`;
	const rawDataPromise = fetch(url).then((res) => res.json());
	const className = rawDataPromise.then((data) => data.data.name as string);
	return className;
};

const dataLoaded: {
	[key: number]: boolean;
} = {};
const data: {
	[key: number]: NoteResponse;
} = {};

export const load = async ({ fetch, url }) => {
	const urlPage = url.searchParams.get('page');
	const page = urlPage ? parseInt(urlPage) : 1;

	if (dataLoaded[page]) return data[page];

	const searchParams = new URLSearchParams(url.search);
	searchParams.set('pageSize', '15');
	searchParams.set('page', urlPage || '1');
	const newUrl = `${PUBLIC_API_URL}/notes?${searchParams.toString()}`;

	const token = browser ? localStorage.getItem('token') : null;

	const rawData = await fetch(newUrl, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	})
		.then((res) => res.json())
		.catch(() => ({
			status: 'error'
		}));

	if (rawData.status === 'error') return { noteDataAvailable: false };

	const mappedData = rawData.data.notes.map(async (note: Note) => {
		note.class = note.class ? await getNameOfClass(note.class) : null;
		return note;
	});
	const mappedDataPromise = Promise.all(mappedData);

	dataLoaded[page] = true;
	data[page] = {
		noteDataAvailable: true,
		data: {
			pageCount: rawData.data.pageCount,
			notes: await mappedDataPromise
		}
	};
	return data[page];
};
