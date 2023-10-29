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
	},

	{
		title: 'nav.register',
		path: '/register',
		bxIcon: 'bx-user-plus',
		description: 'nav.register.description',
		query: ['register', 'signup', 'anmelden', 'registrieren']
	},
	{
		title: 'nav.status',
		path: '/requests/',
		bxIcon: 'bx-user-plus',
		description: 'nav.status.description',
		query: ['stauts', 'anfrage', 'moderation']
	},
	{
		title: 'nav.tricks',
		path: '/tricks',
		bxIcon: 'bx-bulb',
		description: 'nav.tricks.description',
		query: [
			'tricks',
			'tricks',
			'tricks',
			'installation',
			'installieren',
			'pwa',
			'app',
			'download',
			'csv',
			'ics',
			'ical',
			'download',
			'export'
		]
	},
	{
		title: 'nav.settings.colors',
		path: '/settings/colors',
		bxIcon: 'bx-palette',
		description: 'nav.settings.colors.description',
		query: ['colors', 'farben', 'fach', 'fächer', 'subject', 'bunt', 'colorfull']
	},
	{
		title: 'nav.settings.preferences',
		path: '/settings/preferences',
		bxIcon: 'bx-cog',
		description: 'nav.settings.preferences.description',
		query: [
			'preferences',
			'präferenzen',
			'einstellungen',
			'settings',
			'options',
			'optionen',
			'dark',
			'dunkel',
			'light',
			'hell',
			'theme',
			'erscheinungsbild',
			'navigation'
		]
	},
	{
		title: 'nav.contributors',
		path: '/contributors',
		bxIcon: 'bx-group',
		description: 'nav.contributors.description',
		query: ['contributors', 'beiträger', 'mitwirkende', 'mitarbeiter', 'contributors']
	},

	{
		title: 'nav.github.frontend',
		description: 'nav.github.frontend.description',
		path: '/redirect?redirect=https://github.com/dlurak/dloolFrontend',
		bxIcon: 'bxl-github',
		query: ['github', 'frontend', 'source', 'code', 'svelte', 'programming', 'programmieren']
	},
	{
		title: 'nav.github.backend',
		description: 'nav.github.backend.description',
		path: '/redirect?redirect=https://github.com/dlurak/dloolBackend',
		bxIcon: 'bxl-github',
		query: [
			'github',
			'backend',
			'source',
			'code',
			'express',
			'programming',
			'programmieren',
			'rest',
			'api'
		]
	},
	{
		title: 'nav.discord',
		description: 'nav.discord.description',
		path: '/redirect?redirect=https://discord.gg/Kp2BCyR33q',
		bxIcon: 'bxl-discord-alt',
		query: ['discord', 'chat', 'server', 'community', 'support']
	}
];

let id = 0;
export const launcherLinks = rawLauncherLinks.map((link) => ({
	...link,
	id: id++
}));
