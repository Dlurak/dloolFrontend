import { get } from 'svelte/store';

export const subjectIconsObject = {
	math: 'bx-math',
	mathe: 'bx-math',
	mathematik: 'bx-math',
	art: 'bx-palette',
	kunst: 'bx-palette',
	musik: 'bx-music',
	music: 'bx-music',
	sport: 'bx-basketball',
	informatik: 'bx-code',
	'computer science': 'bx-code',
	'computer-science': 'bx-code',
	physik: 'bx-atom',
	physics: 'bx-atom',
	chemie: 'bx-test-tube',
	chemistry: 'bx-test-tube',
	religion: 'bx-church',
	ethik: 'bx-church',
	philosophie: 'bx-book',
	philosophy: 'bx-book',
	erdkunde: 'bx-globe-alt',
	geo: 'bx-globe-alt',
	geographie: 'bx-globe-alt',
	geography: 'bx-globe-alt',
	powi: 'bx-trending-up',
	wipo: 'bx-trending-up',
	wirtschaft: 'bx-trending-up',
	wirtschaftslehre: 'bx-trending-up',
	economics: 'bx-trending-up',
	biologie: 'bx-leaf',
	biology: 'bx-leaf',
	geschichte: 'bxs-castle',
	history: 'bxs-castle',

	deutsch: 'bx-book',
	englisch: 'bx-globe',
	spanisch: 'bx-globe',
	französisch: 'bx-globe',
	russisch: 'bx-globe',
	latein: 'bx-globe',

	english: 'bx-book',
	german: 'bx-globe',
	spanish: 'bx-globe',
	french: 'bx-globe',
	russian: 'bx-globe',
	latin: 'bx-globe'
} as const;
export const subjects = Object.keys(subjectIconsObject) as subjectType[];

const subjectSet = new Set(
	subjects
		.map((subject) => {
			const words = subject.split(' ');
			const capitalizedWords = words.map((word) => {
				return word.charAt(0).toUpperCase() + word.slice(1);
			});
			return capitalizedWords.join(' ');
		})
		.sort()
);
export const subjectsSortetCapitalized = Array.from(subjectSet);

export type subjectType = keyof typeof subjectIconsObject;
export type subjectIcon = (typeof subjectIconsObject)[subjectType];
export type iconForSubject<T extends subjectType> = (typeof subjectIconsObject)[T];

export const iconExistsForSubject = (sub: string): boolean => sub in subjectIconsObject;

export const getIconForSubject = (sub: string): subjectIcon | null => {
	if (iconExistsForSubject(sub)) {
		const subj = sub as subjectType;
		const icon = subjectIconsObject[subj];
		return icon;
	} else return null;
};
