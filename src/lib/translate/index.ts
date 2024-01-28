import { get } from 'svelte/store';
import { localstorage } from 'svocal';
import { z } from 'zod';

import { SvocalKeys } from '../../enums/svocal';
import { currentLanguage } from '../../stores';

export const translate = async (q: string) => {
	const rawUrl = get(localstorage(SvocalKeys.LIBRETRANSLATE_URL, ''));
	const url = rawUrl.endsWith('/') ? rawUrl.slice(0, -1) : rawUrl;
	const token = get(localstorage(SvocalKeys.LIBRETRANSLATE_TOKEN, ''));
	const target = get(currentLanguage);

	const unsafeRes = await fetch(`${url}/translate`, {
		method: 'POST',
		headers: { Accept: 'application/json' },
		mode: 'cors',
		body: new URLSearchParams({ q, target, source: 'auto', format: 'text', api_key: token })
		// body: `q=${query}&source=auto&target=${target}&format=text&api_key=${token}`
	}).then((res) => res.json());

	const scheme = z.object({
		detectedLanguage: z.object({ confidence: z.number(), language: z.string() }),
		translatedText: z.string()
	});

	const parsed = scheme.parse(unsafeRes);

	return parsed.translatedText;
};
