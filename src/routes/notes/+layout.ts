import { PUBLIC_API_URL } from '$env/static/public';

const getNameOfClass = (classId: string) => {
	const url = `${PUBLIC_API_URL}/classes/${classId}`;
	const rawDataPromise = fetch(url).then((res) => res.json());
	const className = rawDataPromise.then((data) => data.data.name as string);
	return className;
};

let dataLoaded = false;
let data: any = null;

export const load = async ({ fetch, url }) => {
	if (dataLoaded) return data;
	const urlPage = url.searchParams.get('page');

	const searchParams = new URLSearchParams(url.search);
	searchParams.set('pageSize', '15');
	searchParams.set('page', urlPage || '1');
	const newUrl = `${PUBLIC_API_URL}/notes?${searchParams.toString()}`;

	const rawData = await fetch(newUrl)
		.then((res) => res.json())
		.catch(() => ({
			status: 'error'
		}));

	if (rawData.status === 'error') return { noteDataAvailable: false };

	const mappedData = rawData.data.notes.map(async (note: any) => {
		note.class = note.class ? await getNameOfClass(note.class) : null;
		return note;
	});
	const mappedDataPromise = Promise.all(mappedData);

	dataLoaded = true;
	data = {
		noteDataAvailable: true,
		data: {
			pageCount: rawData.data.pageCount,
			notes: await mappedDataPromise
		}
	};
	return data;
};
