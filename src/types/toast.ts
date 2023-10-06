import type { Token } from '../languages/i18n';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
	content: Token;
	type: ToastType;
	duration?: number;
	id: number;
}
