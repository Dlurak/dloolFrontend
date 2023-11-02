import { theme } from '../stores';
import type { ThemeProvider } from '../types/settings';
import { getLocalstorageString } from './localstorage';

export const setTheme = (themeProvider: ThemeProvider) => {
	if (themeProvider === 'dark' || themeProvider === 'light') theme.set(themeProvider);
	else if (themeProvider === 'system') {
		if (window) {
			const darkModeMQ = '(prefers-color-scheme: dark)';
			const isDarkModeEnabled = window.matchMedia(darkModeMQ).matches;
			theme.set(isDarkModeEnabled ? 'dark' : 'light');
		} else {
			theme.set('dark');
		}
	}
};

export const th = () => setTheme(getLocalstorageString<ThemeProvider>('themeProvider', 'system'));
