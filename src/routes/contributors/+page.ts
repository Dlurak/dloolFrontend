import type { ContributorResponse, ContributorType } from '../../types/Contributors';

export const load = async () => {
	const frontendUrl = 'https://api.github.com/repos/Dlurak/dloolFrontend/contributors';
	const backendUrl = 'https://api.github.com/repos/Dlurak/dloolBackend/contributors';

	const [frontend, backend] = await Promise.all([
		fetch(frontendUrl).then((r) => r.json()),
		fetch(backendUrl).then((r) => r.json())
	]);

	const filterAndMapRes = (response: ContributorResponse[]) => {
		console.log(response);
		return response
			.filter((contributor) => contributor.type === 'User')
			.map(async (contributor): Promise<ContributorType> => {
				const userUrl = contributor.url;
				const user = await fetch(userUrl).then((r) => r.json());
				return {
					login: user.login,
					avatar_url: user.avatar_url,
					html_url: user.html_url,

					name: user.name,
					company: user.company,
					blog: user.blog,
					location: user.location,
					email: user.email,
					hireable: user.hireable,
					bio: user.bio,
					twitterUsername: user.twitter_username,
					publicRepos: user.public_repos,
					publicGists: user.public_gists,
					followers: user.followers,
					following: user.following,
					createdAt: new Date(user.created_at),
					updatedAt: new Date(user.updated_at),
					contributions: contributor.contributions
				};
			});
	};

	let frontendReturn = null;
	let backendReturn = null;

	if (frontend.message) frontendReturn = null;
	else frontendReturn = await Promise.all(filterAndMapRes(frontend));
	if (backend.message) backendReturn = null;
	else backendReturn = await Promise.all(filterAndMapRes(backend));

	return {
		frontend: frontendReturn,
		backend: backendReturn
	};
};
