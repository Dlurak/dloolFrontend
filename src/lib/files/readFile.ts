export const selectFile = async (accept: string) => {
	const input = document.createElement('input');
	input.type = 'file';
	input.accept = accept;

	return new Promise<File | undefined>((resolve, reject) => {
		input.onchange = async () => {
			const files = input.files;
			if (!files) {
				reject('No file selected');
				return;
			}
			const file = files[0];
			if (!file) {
				reject('No file selected');
				return;
			}

			resolve(file);
		};
		input.click();
	});
};

export const readFileContent = (file: File): Promise<string> => {
	const reader = new FileReader();
	return new Promise((resolve, reject) => {
		reader.onload = (event) => {
			const result = event.target?.result;
			if (typeof result !== 'string') {
				reject('Could not read file');
				return;
			}
			resolve(result);
		};
		reader.onerror = (error) => reject(error);
		reader.readAsText(file);
	});
};

export const getFile = async (accept: string) => {
	const file = await selectFile(accept).catch(() => undefined);
	if (!file) {
		return;
	}
	const content = await readFileContent(file);

	return { file, content };
};
