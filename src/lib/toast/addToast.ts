import { toasts } from '../../routes/stores';
import type { Toast } from '../../types/toast';

type ToastWithoutId = Omit<Toast, 'id'>;
export const addToast = (toast: ToastWithoutId) => {
	toasts.update((currentToasts) => {
		const id = currentToasts.length + 1;
		return [...currentToasts, { ...toast, id }];
	});
};
