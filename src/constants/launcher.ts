const rawLauncherLinks = [
	{
		title: 'Home',
		path: '/',
		bxIcon: 'bx-home',
		description: 'Homepage'
	},
	{
		title: 'Login',
		path: '/login',
		bxIcon: 'bx-user',
		description: 'Login'
	},
	{
		title: 'Homework',
		path: '/homework',
		bxIcon: 'bx-book',
		description: 'Homework'
	},
	{
		title: 'Notes',
		path: '/notes',
		bxIcon: 'bx-notepad',
		description: 'Public and private notes'
	},
	{
		title: 'Events',
		path: '/events',
		bxIcon: 'bx-calendar',
		description: 'Events'
	},
	{
		title: 'Sign Up Request',
		path: '/requests/list',
		bxIcon: 'bx-user-plus',
		description: 'Sign Up Requests you can accept or reject'
	},
	{
		title: 'Settings',
		path: '/settings',
		bxIcon: 'bx-cog',
		description: 'Settings'
	}
] as const;

let id = 0;
export const launcherLinks = rawLauncherLinks.map((link) => ({
	...link,
	id: id++
}));
