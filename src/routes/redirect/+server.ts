import { json, redirect } from '@sveltejs/kit';

// Some components (e.g. the launcher) can only redirect to a local path
// so when I want to redirect to an external site
// I need to use this route
export const GET = ({ url }) => {
	// get query params
	const redirectDestination = url.searchParams.get('redirect');
	if (!redirectDestination)
		return json({ error: 'No redirect destination provided' }, { status: 400 });
	throw redirect(300, redirectDestination);
};
