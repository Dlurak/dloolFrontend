import { backendUrl as backendUrlStore } from '$lib/../stores';

let backendUrl = '';
backendUrlStore.subscribe((url) => (backendUrl = url));

export const loadSchools = async (query: string) => {
	const page = 1;
	const pageSize = 25;

	const data = fetch(`${backendUrl}/schools?page=${page}&pageSize=${pageSize}&q=${query}`).then(
		(res) => res.json()
	);

	const schools: {
		_id: string;
		name: string;
		description: string;
		uniqueName: string;
		timezoneOffset: number;
		classes: string[];
	}[] = (await data).data.schools;

	const mappedSchools = schools.map((school) => {
		return { name: school.name };
	});

	return mappedSchools;
};
