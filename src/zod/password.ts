import {
	hasLowercaseLetter,
	hasNumber,
	hasSpecialCharacter,
	hasUppercaseLetter
} from '$lib/utils/string';
import { z } from 'zod';

export const passwordSchema = z
	.string()
	.min(8, {
		message: 'length'
	})
	.refine(hasLowercaseLetter, {
		message: 'lowercase'
	})
	.refine(hasUppercaseLetter, {
		message: 'uppercase'
	})
	.refine(hasNumber, {
		message: 'number'
	})
	.refine(hasSpecialCharacter, {
		message: 'special'
	});

const errorMessages = ['length', 'lowercase', 'uppercase', 'number', 'special'] as const;

export type PwdErrorMessage = (typeof errorMessages)[number];
