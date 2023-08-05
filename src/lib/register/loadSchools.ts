import { PUBLIC_API_URL } from '$env/static/public';

export const loadSchools = async (query: string) => {
	const page = 1;
	const pageSize = 25;

	const data = fetch(`${PUBLIC_API_URL}/schools?page=${page}&pageSize=${pageSize}&q=${query}`).then(
		(res) => res.json()
	);

	return (await data).data;
};
