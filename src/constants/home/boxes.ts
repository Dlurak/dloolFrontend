import type { Token } from '../../languages/i18n';

type Box = {
	emoji: string;
	description: Token;
	title: Token;
};

export const boxes: Box[] = [
	{
		emoji: '📱',
		title: 'home.boxes.crossPlattform',
		description: 'home.boxes.crossPlattform.description'
	},

	{
		emoji: '👨‍👩‍👧‍👦',
		title: 'home.boxes.collaborative',
		description: 'home.boxes.collaborative.description'
	},

	{
		emoji: '⚙️',
		title: 'home.boxes.customizable',
		description: 'home.boxes.customizable.description'
	},

	{
		emoji: '🗽',
		title: 'home.boxes.libre',
		description: 'home.boxes.libre.description'
	},

	{
		emoji: '🎓',
		title: 'home.boxes.students',
		description: 'home.boxes.students.description'
	},

	{
		emoji: '🧠',
		title: 'home.boxes.easy',
		description: 'home.boxes.easy.description'
	}
];
