import { writable } from 'svelte/store';
import type { Note } from './types/notes';
import type { Event } from './types/events';
import type { Languages, Token } from './languages/i18n';
import type { Toast } from './types/toast';
import type { SubjectColor } from './types/subjectColors';
import { PUBLIC_API_URL } from '$env/static/public';
import type { launcherLink } from './types/launcher';
import { launcherLinks as launcherLinksConst } from './constants/launcher';

export const focusedNote = writable<Note | null>(null);
export const showHomeworkFilter = writable<boolean>(false);
export const subjectIcons = writable<Record<string, string>>({});
export const calendarEvents = writable<Event[] | null>();

export const currentLanguage = writable<Languages>('de');

export const title = writable<Token | null>(null);

export const toasts = writable<Toast[]>([]);

export const network = writable<'online' | 'offline'>();

export const theme = writable<'light' | 'dark'>('light');

export const settings = writable<{
	showTextInNavbar: boolean;
	showSearchInNavbar: boolean;
}>({
	showTextInNavbar: true,
	showSearchInNavbar: false
});

export const subjectColors = writable<SubjectColor[]>([]);

export const showLauncher = writable(false);
export const launcherLinks = writable<launcherLink[]>(launcherLinksConst);
export const unfilteredLauncherLinks = writable<launcherLink[]>(launcherLinksConst);

export const backendUrl = writable(PUBLIC_API_URL);
