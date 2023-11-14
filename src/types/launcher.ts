import type { Token } from '../languages/i18n';

export type launcherLink = {
	title: Token;
	action: () => void;
	bxIcon: string;
	description: Token;
	query: string[];
	id: number;
	matchingWord: string;
};
