export type ContributorType = {
	login: string;
	avatar_url: string;
	html_url: string;

	name: string | null;
	company: string | null;
	blog: string;
	location: string | null;
	email: string | null;
	hireable: boolean | null;
	bio: string | null;
	twitterUsername: string | null;
	publicRepos: number;
	publicGists: number;
	followers: number;
	following: number;
	createdAt: Date;
	updatedAt: Date;
};
