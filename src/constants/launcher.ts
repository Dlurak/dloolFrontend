import { goto } from '$app/navigation';
import { setLocalstorageString } from '$lib/localstorage';
import { th } from '$lib/theme';
import type { Token } from '../languages/i18n';
import {
	launcherLinks as linksStore,
	showLauncher,
	theme,
	unfilteredLauncherLinks
} from '../stores';
import type { launcherLink } from '../types/launcher';

type VoidFunction = () => void | Promise<void>;

const rawLauncherLinks: {
	title: Token;
	action: VoidFunction;
	bxIcon: string;
	description: Token;
	query: string[];
	closeManually?: boolean;
}[] = [
	{
		title: 'nav.home',
		action: () => goto('/'),
		bxIcon: 'bx-home',
		description: 'nav.home.description',
		query: ['home', 'homepage', 'main', 'main page', 'startseite']
	},
	{
		title: 'nav.login',
		action: () => goto('/login'),
		bxIcon: 'bx-user',
		description: 'nav.login.description',
		query: ['login', 'signin', 'anmelden', 'einloggen']
	},
	{
		title: 'nav.homework',
		action: () => goto('/homework'),
		bxIcon: 'bx-book',
		description: 'nav.homework.description',
		query: ['homework', 'tasks', 'assignments', 'aufgaben', 'hausaufgaben', 'hausaufgabenheft']
	},
	{
		title: 'nav.notes',
		action: () => goto('/notes'),
		bxIcon: 'bx-notepad',
		description: 'nav.notes.description',
		query: ['notes', 'notizen', 'notitzbuch']
	},
	{
		title: 'nav.events',
		action: () => goto('/events'),
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
		action: () => goto('/requests/list'),
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
		action: () => goto('/settings'),
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
		action: () => goto('/register'),
		bxIcon: 'bx-user-plus',
		description: 'nav.register.description',
		query: ['register', 'signup', 'anmelden', 'registrieren']
	},
	{
		title: 'nav.status',
		action: () => goto('/requests/list'),
		bxIcon: 'bx-user-plus',
		description: 'nav.status.description',
		query: ['stauts', 'anfrage', 'moderation']
	},
	{
		title: 'nav.tricks',
		action: () => goto('/tricks'),
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
		action: () => goto('/settings/colors'),
		bxIcon: 'bx-palette',
		description: 'nav.settings.colors.description',
		query: ['colors', 'farben', 'fach', 'fächer', 'subject', 'bunt', 'colorfull']
	},
	{
		title: 'nav.settings.preferences',
		action: () => goto('/settings/preferences'),
		bxIcon: 'bx-cog',
		description: 'nav.settings.preferences.description',
		query: [
			'preferences',
			'präferenzen',
			'einstellungen',
			'settings',
			'options',
			'optionen',
			'navigation'
		]
	},
	{
		title: 'nav.contributors',
		action: () => goto('/contributors'),
		bxIcon: 'bx-group',
		description: 'nav.contributors.description',
		query: ['contributors', 'beiträger', 'mitwirkende', 'mitarbeiter', 'contributors']
	},
	{
		title: 'nav.documentation',
		action: () => goto('/documentation'),
		bxIcon: 'bx-book-open',
		description: 'nav.documentation.description',
		query: ['documentation', 'dokumentation', 'erklärung', 'explaination', 'docs', 'doku']
	},

	{
		title: 'settings.apperance.theme',
		action: () => {
			const newActions: launcherLink[] = [
				{
					title: 'settings.apperance.theme.light',
					action: () => {
						setLocalstorageString('themeProvider', 'light');
						theme.set('light');
						showLauncher.set(false);
					},
					bxIcon: 'bx-sun',
					description: 'settings.apperance.theme.light',
					query: ['light', 'hell'],
					id: 0,
					matchingWord: ''
				},
				{
					title: 'settings.apperance.theme.dark',
					action: () => {
						setLocalstorageString('themeProvider', 'dark');
						theme.set('dark');
						showLauncher.set(false);
					},
					bxIcon: 'bx-moon',
					description: 'settings.apperance.theme.dark',
					query: ['dark', 'dunkel'],
					id: 1,
					matchingWord: ''
				},
				{
					title: 'settings.apperance.theme.system',
					action: () => {
						setLocalstorageString('themeProvider', 'system');
						th();
						showLauncher.set(false);
					},
					bxIcon: 'bx-sun',
					description: 'settings.apperance.theme.system',
					query: ['system', 'systemeinstellung', 'auto', 'automatisch', 'automatic', 'default'],
					id: 2,
					matchingWord: ''
				}
			];
			unfilteredLauncherLinks.set(newActions);
			linksStore.set(newActions);
		},
		bxIcon: 'bx-palette',
		description: 'settings.apperance.theme',
		query: ['theme', 'dark', 'light', 'erscheinungsbild', 'farben', 'colors'],
		closeManually: true
	},

	{
		title: 'nav.github.frontend',
		description: 'nav.github.frontend.description',
		action: () => goto('/redirect?redirect=https://github.com/dlurak/dloolFrontend'),
		bxIcon: 'bxl-github',
		query: ['github', 'frontend', 'source', 'code', 'svelte', 'programming', 'programmieren']
	},
	{
		title: 'nav.github.backend',
		description: 'nav.github.backend.description',
		action: () => goto('/redirect?redirect=https://github.com/dlurak/dloolBackend'),
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
		action: () => goto('/redirect?redirect=https://discord.gg/Kp2BCyR33q'),
		bxIcon: 'bxl-discord-alt',
		query: ['discord', 'chat', 'server', 'community', 'support']
	}
];

let id = 0;
export const launcherLinks = rawLauncherLinks.map((link) => ({
	...link,
	id: id++,
	matchingWord: ''
}));
