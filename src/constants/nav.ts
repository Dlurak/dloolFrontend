export const navData = [
	{
		title: 'login',
		uri: '/login',
		showInNav: true,
		navBoxIcon: 'bx-user',
		showInFooter: true,
		footerCategory: 'Authentication'
	},
	{
		title: 'register',
		uri: '/register',
		showInNav: true,
		navBoxIcon: 'bx-user-plus',
		showInFooter: true,
		footerCategory: 'Authentication'
	},
	{
		title: 'notes',
		uri: '/notes',
		showInNav: true,
		navBoxIcon: 'bx-notepad',
		showInFooter: true,
		footerCategory: 'Notes'
	},
	{
		title: 'homework',
		uri: '/homework',
		showInNav: true,
		navBoxIcon: 'bx-book',
		showInFooter: true,
		footerCategory: 'Homework'
	},
	{
		title: 'events',
		uri: '/events',
		showInNav: true,
		navBoxIcon: 'bx-calendar',
		showInFooter: true,
		footerCategory: 'events'
	},
	{
		title: 'settings',
		uri: '/settings',
		showInNav: false,
		navBoxIcon: 'bx-cog',
		showInFooter: true,
		footerCategory: 'Authentication'
	},
	{
		title: 'export',
		uri: '/tricks#export',
		showInNav: false,
		navBoxIcon: '',
		showInFooter: true,
		footerCategory: 'Tricks'
	},
	{
		title: 'install',
		uri: '/tricks#install',
		showInNav: false,
		navBoxIcon: '',
		showInFooter: true,
		footerCategory: 'Tricks'
	},
	{
		title: 'status',
		uri: '/requests',
		showInNav: false,
		navBoxIcon: '',
		showInFooter: true,
		footerCategory: 'Moderation'
	},
	{
		title: 'requests',
		uri: '/requests/list',
		showInNav: false,
		navBoxIcon: '',
		showInFooter: true,
		footerCategory: 'Moderation'
	}
] as const;
