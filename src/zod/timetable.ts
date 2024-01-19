import { z } from 'zod';

const daySchema = z.union([
	z.literal('mo'),
	z.literal('tu'),
	z.literal('we'),
	z.literal('th'),
	z.literal('fr'),
	z.literal('sa'),
	z.literal('su')
]);

const stringArraySchema = z.array(z.string());
export const timetableSchema = z.record(daySchema, stringArraySchema);
