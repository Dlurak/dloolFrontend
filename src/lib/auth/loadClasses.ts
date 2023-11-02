import { backendUrl as backendUrlStore } from '$lib/../stores';

let backendUrl = '';
backendUrlStore.subscribe((url) => (backendUrl = url));

export const loadClasses = async (school: string) => {
	const data = fetch(`${backendUrl}/classes?school=${school}`).then((res) => res.json());

	return (await data).data;
};
