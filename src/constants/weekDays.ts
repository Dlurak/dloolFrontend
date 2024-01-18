export const weekdays = ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'] as const;
export const emptyTimeTable = {
	mo: [],
	tu: [],
	we: [],
	th: [],
	fr: [],
	sa: [],
	su: []
} satisfies TimeTable;

export type WeekDay = (typeof weekdays)[number];

export type TimeTable = {
	[day in WeekDay]: string[];
};
