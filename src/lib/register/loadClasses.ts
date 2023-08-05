import { PUBLIC_API_URL } from '$env/static/public';

export const loadClasses = async (school: string) => {
	const data = fetch(`${PUBLIC_API_URL}/classes?school=${school}`).then((res) => res.json());

	return (await data).data;
};
