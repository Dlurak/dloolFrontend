import type { TPar, Token } from '../languages/i18n';

export type launcherLink<Tok extends Token> = {
	title: Tok;
	tokenOptions?: {
		parts: TPar<Tok>;
	};
	action: () => void;
	bxIcon: string;
	description: Token;
	query: string[];
	id: number;
	matchingWord: string;
	showSimpelfied: boolean;
};
