const rawLauncherLinks = [
	{
		title: 'Home',
		path: '/',
		bxIcon: 'bx-home',
		description: 'Homepage',
		query: ['home', 'homepage']
	},
	{
		title: 'Login',
		path: '/login',
		bxIcon: 'bx-user',
		description: 'Login',
		query: ['login']
	},
	{
		title: 'Homework',
		path: '/homework',
		bxIcon: 'bx-book',
		description: 'Homework',
		query: ['homework']
	},
	{
		title: 'Notes',
		path: '/notes',
		bxIcon: 'bx-notepad',
		description: 'Public and private notes',
		query: ['notes']
	},
	{
		title: 'Events',
		path: '/events',
		bxIcon: 'bx-calendar',
		description: 'Events',
		query: ['events', 'tests', 'exams', 'calendar', 'schedule']
	},
	{
		title: 'Sign Up Request',
		path: '/requests/list',
		bxIcon: 'bx-user-plus',
		description: 'Sign Up Requests you can accept or reject',
		query: ['sign up requests', 'requests', 'moderation']
	},
	{
		title: 'Settings',
		path: '/settings',
		bxIcon: 'bx-cog',
		description: 'Settings',
		query: ['settings', 'preferences']
	}
];

let id = 0;
export const launcherLinks = rawLauncherLinks.map((link) => ({
	...link,
	id: id++
}));
