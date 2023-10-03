import { browser } from '$app/environment';
import { currentLanguage } from '../routes/stores';
import de, { type DeStrings, type DeToken } from './de';
import type { EnStrings, EnToken } from './en';
import en from './en';

export const languages = {
	de: de,
	en: en
};
export const languageShortcuts = Object.keys(languages) as (keyof typeof languages)[];
export type Languages = keyof typeof languages;

export let lang: Languages = 'de';

currentLanguage.subscribe((value) => {
	lang = value;
});

export type Token = EnToken & DeToken;
export type Translations = EnStrings | DeStrings;

type GermanTranslation<T extends DeToken> = (typeof de)[T];
type EnglishTranslation<T extends EnToken> = (typeof en)[T];
export type T<T extends Token> = T extends Token
	? GermanTranslation<T> | EnglishTranslation<T>
	: never;

interface I18nProps {
	transform?: 'uppercase' | 'lowercase' | 'capitalize';
}

/**
 * A function to get the i18n version of a string
 * @param key The key of the translation
 * @returns A translation
 */
export const i = (key: Token, parts: Record<string, string> = {}, options: I18nProps = {}) => {
	const baseString = languages[lang][key] as T<typeof key>;

	let string: string = baseString;
	Object.keys(parts).forEach((part) => {
		string = string.replace(`$${part}`, parts[part]);
	});

	if (options.transform) {
		switch (options.transform) {
			case 'uppercase':
				return string.toUpperCase();
			case 'lowercase':
				return string.toLowerCase();
			case 'capitalize':
				return string.charAt(0).toUpperCase() + string.slice(1);
		}
	}

	return string;
};

export const switchLanguage = (language: Languages) => {
	currentLanguage.set(language);
	if (browser) localStorage.setItem('language', language);
};
