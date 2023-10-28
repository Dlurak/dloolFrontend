import { z } from 'zod';

export const subjectColorSchema = z.object({
	subject: z.string(),
	color: z.object({
		r: z.number().max(255).min(0),
		g: z.number().max(255).min(0),
		b: z.number().max(255).min(0)
	})
});
