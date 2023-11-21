import type { Token, T } from '../languages/i18n';
import type { ExtractWordsAfterDollarSign } from '../types/i18n';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export type Toast<ct extends Token> = {
	content: ct;
	type: ToastType;
	duration?: number;
	id: number;
	contentOptions?: {
		parts: Record<ExtractWordsAfterDollarSign<T<ct>>, string>;
	};
};
