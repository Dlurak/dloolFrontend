import { backendUrl } from '../stores';
import { setLocalstorageString } from './localstorage';

export const setBackendUrl = async (url: string) => {
	const data = await fetch(url)
		.then(
			(res) =>
				res.json() as Promise<{
					name: string;
					isDlool: boolean;
				}>
		)
		.catch(() => ({
			isDlool: false
		}));

	if (data.isDlool) {
		url = url.replace(/\/$/, '');
		setLocalstorageString('backendUrl', url);
		backendUrl.set(url);
		return true;
	}
	return false;
};
