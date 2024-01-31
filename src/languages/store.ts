import { writable } from 'svelte/store';
import { i, type I18nProps, type TPar, type Token, type TRes } from './i18n';
import { currentLanguage } from '../stores';

export const inter = <Tok extends Token, Opt extends I18nProps, Par extends TPar<Tok>>(
	key: Tok,
	parts: Par = {} as Par,
	options: Opt = {} as Opt
) => {
	let currentValue = i(key, parts, options);
	const { subscribe, set } = writable<TRes<Tok, Par, Opt>>(currentValue);
	currentLanguage.subscribe(() => {
		currentValue = i(key, parts, options);
		set(currentValue);
	});

	return { subscribe, translation: currentValue };
};
