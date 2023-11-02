import { toasts } from '../../stores';
import type { Toast } from '../../types/toast';

type ToastWithoutId = Omit<Toast, 'id'>;

/**
 * A function to add a toast to the toast store. It's recommended to use a duration of 5000ms.
 * @param toast The toast to add, it's recommended to use a duration of 5000ms
 * @example addToast({ content: 'toast.logout', duration: 5000, type: 'info' })
 * @returns A promise that resolves after the duration of the toast. When now duration is specified, it resolves immediately.
 */
export const addToast = (toast: ToastWithoutId): Promise<void> => {
	toasts.update((currentToasts) => {
		const biggestToastId = Math.max(...currentToasts.map((toast) => toast.id));
		const biggestToastIdIsFinite = isFinite(biggestToastId);
		const id = biggestToastIdIsFinite ? biggestToastId + 1 : 0;
		return [...currentToasts, { ...toast, id }];
	});

	if (toast.duration) return new Promise((resolve) => setTimeout(resolve, toast.duration));
	else return Promise.resolve();
};
