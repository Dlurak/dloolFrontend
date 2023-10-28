import { z } from 'zod';
import { subjectColorSchema } from '../../zod/subjectColor';
import type { SubjectColor } from '../../types/subjectColors';

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

export const checkIfValid = (content: string): boolean => {
	try {
		const parsed = JSON.parse(content);
		if (!Array.isArray(parsed)) {
			return false;
		}
	} catch {
		return false;
	}

	const schema = z.array(subjectColorSchema);

	const zodResult = schema.safeParse(JSON.parse(content));
	if (!zodResult.success) {
		return false;
	}

	return true;
};

export const parseContent = (correctContent: string): SubjectColor[] => {
	const schema = z.array(subjectColorSchema);

	const zodResult = schema.safeParse(JSON.parse(correctContent));
	if (!zodResult.success) {
		throw new Error('Could not parse content');
	}

	return zodResult.data as SubjectColor[];
};
