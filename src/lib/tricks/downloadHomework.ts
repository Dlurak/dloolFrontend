import { backendUrl as backendUrlStore } from '$lib/../stores';
import { addToast } from '$lib/toast/addToast';
import { i } from '../../languages/i18n';

let backendUrl = '';
backendUrlStore.subscribe((url) => (backendUrl = url));

export type ResultType = 'text/calendar' | 'text/csv';
export type Option = {
	type: ResultType;
	title: string;
	fileExtension: string;
};

export const downloadHomework = (
	school: string,
	className: string,
	allOptions: Option[],
	currentResultType: ResultType
) => {
	const currentOption = allOptions.find((option) => option.type === currentResultType);
	if (!currentOption) {
		return;
	}

	const url = `${backendUrl}/homework/all?school=${school}&class=${className}`;

	fetch(url, {
		headers: {
			Accept: currentResultType
		}
	})
		.then((res) => res.text())
		.then((text) => {
			// try to json parse the response
			try {
				const json = JSON.parse(text);

				if (json.status === 'error')
					return addToast({
						content: 'toast.download.homework.error',
						type: 'error',
						duration: 5000
					});
			} catch (e) {
				// This is the expected behaviour

				const blob = new Blob([text], { type: currentResultType });

				const link = document.createElement('a');
				link.href = window.URL.createObjectURL(blob);
				link.download = `${i('homework')}.${currentOption.fileExtension}`;

				link.click();

				return addToast({
					content: 'toast.download.homework.success',
					type: 'success',
					duration: 5000
				});
			}
		});
};
