import { PUBLIC_API_URL } from '$env/static/public';

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

	const url = `${PUBLIC_API_URL}/homework/all?school=${school}&class=${className}`;

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

				if (json.status === 'error') return;
			} catch (e) {
				// This is the expected behaviour

				const blob = new Blob([text], { type: currentResultType });

				const link = document.createElement('a');
				link.href = window.URL.createObjectURL(blob);
				link.download = `homework.${currentOption.fileExtension}`;

				link.click();
			}
		});
};
