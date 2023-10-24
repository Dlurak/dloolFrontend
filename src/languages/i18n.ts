import { browser } from '$app/environment';
import { currentLanguage } from '../routes/stores';
import type { ExtractWordsAfterDollarSign, ReplaceSubstringType } from '../types/i18n';
import { slice, type FirstNStringChars } from '../types/strings/slice';
import {
	transform,
	type Transformations,
	type TransformResult
} from '../types/strings/transformations';
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
export type T<Ty extends Token> = Ty extends Token
	? GermanTranslation<Ty> | EnglishTranslation<Ty>
	: never;

interface I18nProps {
	transform?: Transformations;
	maxLength?: number;
}

/**
 * A function to get the i18n version of a string
 * @param key The key of the translation
 * @returns A translation
 */
export const i = <
	Tok extends Token,
	Opt extends I18nProps,
	Par extends Record<ExtractWordsAfterDollarSign<T<Tok>>, string>
>(
	key: Tok,
	parts: Par = {} as Par,
	options: Opt = {} as Opt
): FirstNStringChars<
	TransformResult<ReplaceSubstringType<T<Tok>, Par>, Opt['transform']>,
	Opt['maxLength']
> => {
	type LiteralTypes<T> = {
		[K in keyof T]: T[K];
	};

	const baseString = languages[lang][key] as T<typeof key>;

	let unPartedString: string = baseString;

	const partKeys = Object.keys(parts) as ExtractWordsAfterDollarSign<T<typeof key>>[];
	partKeys.forEach((part) => {
		unPartedString = unPartedString.replace(`$${part}`, parts[part]);
	});

	const unTransformedString = unPartedString as ReplaceSubstringType<
		T<typeof key>,
		LiteralTypes<Par>
	>;
	const string = options.maxLength
		? slice(unTransformedString, options.maxLength)
		: unTransformedString;

	if (options.transform) return transform(string, options.transform) as any;

	return string as any;
};

export const switchLanguage = (language: Languages) => {
	currentLanguage.set(language);
	if (browser) localStorage.setItem('language', language);
};
