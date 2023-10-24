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
	contributions: number;
};

export type ContributorResponse = {
	id: number;
	node_id: string;
	avatar_url: string;
	gravatar_id: string;
	url: string;
	html_url: string;
	followers_url: string;
	following_url: string;
	gists_url: string;
	starred_url: string;
	subscriptions_url: string;
	organizations_url: string;
	repos_url: string;
	events_url: string;
	received_events_url: string;
	type: 'Bot' | 'User';
	site_admin: false;
	contributions: number;
};
