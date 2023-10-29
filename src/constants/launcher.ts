import type { Token } from '../languages/i18n';

const rawLauncherLinks: {
	title: Token;
	path: string;
	bxIcon: string;
	description: Token;
	query: string[];
}[] = [
	{
		title: 'nav.home',
		path: '/',
		bxIcon: 'bx-home',
		description: 'nav.home.description',
		query: ['home', 'homepage', 'main', 'main page', 'startseite']
	},
	{
		title: 'nav.login',
		path: '/login',
		bxIcon: 'bx-user',
		description: 'nav.login.description',
		query: ['login', 'signin', 'anmelden', 'einloggen']
	},
	{
		title: 'nav.homework',
		path: '/homework',
		bxIcon: 'bx-book',
		description: 'nav.homework.description',
		query: ['homework', 'tasks', 'assignments', 'aufgaben', 'hausaufgaben', 'hausaufgabenheft']
	},
	{
		title: 'nav.notes',
		path: '/notes',
		bxIcon: 'bx-notepad',
		description: 'nav.notes.description',
		query: ['notes', 'notizen', 'notitzbuch']
	},
	{
		title: 'nav.events',
		path: '/events',
		bxIcon: 'bx-calendar',
		description: 'nav.events.description',
		query: [
			'events',
			'tests',
			'exams',
			'calendar',
			'schedule',
			'kalendar',
			'kalender',
			'termine',
			'klausuren',
			'prüfungen',
			'klassenarbeiten',
			'tests',
			'arbeiten'
		]
	},
	{
		title: 'nav.requests',
		path: '/requests/list',
		bxIcon: 'bx-user-plus',
		description: 'nav.requests.description',
		query: [
			'sign up requests',
			'requests',
			'moderation',
			'anfragen',
			'klassenmitglieder',
			'klassenkameraden',
			'classmates'
		]
	},
	{
		title: 'nav.settings',
		path: '/settings',
		bxIcon: 'bx-cog',
		description: 'nav.settings.description',
		query: [
			'settings',
			'preferences',
			'einstellungen',
			'präferenzen',
			'konfiguration',
			'configuration',
			'optionen',
			'options'
		]
	}
];

let id = 0;
export const launcherLinks = rawLauncherLinks.map((link) => ({
	...link,
	id: id++
}));
