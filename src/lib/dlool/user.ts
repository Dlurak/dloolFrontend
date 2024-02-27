import { get } from 'svelte/store';
import { backendUrl } from '../../stores';
import { z } from 'zod';

const userScheme = z.object({
	status: z.literal('success'),
	message: z.literal('User details'),
	data: z.object({
		user: z.object({
			_id: z.string(),
			name: z.string(),
			school: z.string(),
			classes: z.array(z.string())
		})
	})
});

export const loadUser = async (userId: string) => {
	const response = await fetch(`${get(backendUrl)}/auth/${userId}`);

	if (!response.ok) {
		throw new Error('Unsuccessfull');
	}

	const unparsed = await response.json();

	const parsed = userScheme.parse(unparsed);

	return parsed.data.user;
};
