import { goto } from '$app/navigation';
import { getCountries } from '$lib/holidays/api/countries';
import { setNewList } from '$lib/layout/launcher/setNewList';
import { setLocalstorage } from '$lib/localstorage';
import { setAndStoreTheme } from '$lib/theme';
import { localstorage } from 'svocal';
import type { Token } from '../languages/i18n';
import { currentLanguage, settings, showLauncher } from '../stores';
import { SvocalKeys } from '../enums/svocal';
import { getSubdivisions } from '$lib/holidays/api/subdivisions';
import { get } from 'svelte/store';
import { Holiday } from 'open-holiday-js';
import { addToast } from '$lib/toast/addToast';

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
		query: ['notes', 'notizen', 'notizbuch']
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
		title: 'nav.settings.timetable',
		action: () => goto('/settings/timetable'),
		bxIcon: 'bx-calendar',
		description: 'nav.settings.timetable.description',
		query: [
			'timetable',
			'stundenplan',
			'fächer',
			'fach',
			'subjects',
			'subject',
			'autocomplete',
			'autovervollständigung'
		]
	},
	{
		title: 'nav.settings.language',
		action: () => goto('/settings/language'),
		bxIcon: 'bx-globe',
		description: 'nav.settings.language.description',
		query: [
			'language',
			'Sprache',
			'international',
			'i18n',
			'Deutsch',
			'Englisch',
			'German',
			'English',
			'LibreTranslate',
			'Übersetzen',
			'Translate'
		]
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
		title: 'nav.holiday',
		action: () => goto('/holidays'),
		bxIcon: 'bx-calendar',
		description: 'nav.holiday.description',
		query: ['ferien', 'urlaub', 'feiertage', 'schulfrei', 'holiday']
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
		action: () =>
			setNewList([
				{
					title: 'settings.apperance.theme.light',
					action: () => {
						setAndStoreTheme('light');
						showLauncher.set(false);
					},
					bxIcon: 'bx-sun',
					description: 'settings.apperance.theme.light',
					query: ['light', 'hell']
				},
				{
					title: 'settings.apperance.theme.dark',
					action: () => {
						setAndStoreTheme('dark');
						showLauncher.set(false);
					},
					bxIcon: 'bx-moon',
					description: 'settings.apperance.theme.dark',
					query: ['dark', 'dunkel']
				},
				{
					title: 'settings.apperance.theme.system',
					action: () => {
						setAndStoreTheme('system');
						showLauncher.set(false);
					},
					bxIcon: 'bx-sun',
					description: 'settings.apperance.theme.system',
					query: ['system', 'systemeinstellung', 'auto', 'automatisch', 'automatic', 'default']
				}
			]),
		bxIcon: 'bx-palette',
		description: 'settings.apperance.theme',
		query: ['theme', 'dark', 'light', 'erscheinungsbild', 'farben', 'colors'],
		closeManually: true
	},
	{
		title: 'settings.local.country',
		action: async () => {
			const countries = await new Holiday().getCountries().catch(() => {
				showLauncher.set(false);
				addToast({ content: 'error', type: 'error', duration: 5_000 });

				return [];
			});

			setNewList(
				countries.map((c) => ({
					title: 'literal',
					titleOptions: {
						parts: {
							string: (
								c.name.find((n) => n.language === get(currentLanguage).toUpperCase()) || c.name[0]
							).text
						}
					},
					action: () => {
						localstorage(SvocalKeys.HOLIDAYS_COUNTRY, 'DE').set(c.isoCode);
					},
					bxIcon: '',
					description: 'literal',
					query: c.name.map((n) => n.text)
				}))
			);
		},
		bxIcon: 'bx-map-alt',
		description: 'settings.local.country',
		query: ['lokalisierung', 'staat', 'country'],
		closeManually: true
	},
	{
		title: 'settings.local.subdivision',
		action: async () => {
			const subs = await new Holiday()
				.getSubdivisions(get(localstorage(SvocalKeys.HOLIDAYS_COUNTRY, 'DE')))
				.catch(() => {
					showLauncher.set(false);
					addToast({ content: 'error', duration: 5_000, type: 'error' });

					return [];
				});

			setNewList(
				subs.map((s) => ({
					title: 'literal',
					titleOptions: {
						parts: {
							string: (
								s.name.find((n) => n.language === get(currentLanguage).toUpperCase()) || s.name[0]
							).text
						}
					},
					action: () => {
						localstorage(SvocalKeys.HOLIDAYS_STATE, 'HE').set(s.shortName);
					},
					bxIcon: '',
					description: 'literal',
					query: [...s.name.map((n) => n.text), s.shortName]
				}))
			);
		},
		bxIcon: 'bx-map-alt',
		description: 'settings.local.subdivision',
		query: ['lokalisierung', 'bundesland', 'state'],
		closeManually: true
	},
	{
		title: 'settings.apperance.nav.text',
		action: () =>
			setNewList([
				{
					title: 'settins.apperance.nav.text.show',
					action: () => {
						settings.update((s) => {
							s.showTextInNavbar = true;
							return s;
						});
						setLocalstorage('textInNav', true);
						showLauncher.set(false);
					},
					bxIcon: 'bx-check',
					description: 'settins.apperance.nav.text.show',
					query: []
				},
				{
					title: 'settins.apperance.nav.text.hide',
					action: () => {
						settings.update((s) => {
							s.showTextInNavbar = false;
							return s;
						});
						setLocalstorage('textInNav', false);
						showLauncher.set(false);
					},
					bxIcon: 'bx-minus',
					description: 'settins.apperance.nav.text.hide',
					query: []
				}
			]),
		bxIcon: 'bx-text',
		closeManually: true,
		query: ['text', 'beschreibung', 'description', 'navigation', 'label'],
		description: 'settings.apperance.nav.text'
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
	}
];

let id = 0;
export const launcherLinks = rawLauncherLinks.map((link) => ({
	...link,
	id: id++,
	matchingWord: '',
	showSimpelfied: false
}));
