export const allIds = ['login', 'homework', 'events', 'notes', 'search', 'register', 'settings'] as const;
export type Id = (typeof allIds)[number];

type UriGoal = {
	type: 'uri';
	uri: string;
	boxIcon: string;
	title: string;
};

type Custom = {
	type: 'custom';
	id: string;
	boxIcon: string;
};

export const navbarData = {
	login: {
		type: 'uri',
		uri: '/login',
		boxIcon: 'bx-user',
		title: 'login'
	} as const,
	homework: {
		type: 'uri',
		uri: '/homework',
		boxIcon: 'bx-book',
		title: 'homework'
	} as const,
	events: {
		type: 'uri',
		uri: '/events',
		boxIcon: 'bx-calendar',
		title: 'events'
	} as const,
	notes: {
		type: 'uri',
		uri: '/notes',
		boxIcon: 'bx-notepad',
		title: 'notes'
	} as const,
	search: {
		type: 'custom',
		boxIcon: 'bx-search',
		id: 'search'
	} as const,
	register: {
		type: 'uri',
		uri: '/register',
		boxIcon: 'bx-user-plus',
		title: 'register'
	} as const,
	settings: {
		type: 'uri',
		uri: '/settings',
		boxIcon: 'bx-cog',
		title: 'settings'
	} as const
} satisfies Record<Id, UriGoal | Custom>;
