import { diceCoefficient } from 'dice-coefficient';

export const findLinks = (query: string, links: Record<number, string[]>) => {
	const tokenizer = (str: string) => str.toLowerCase().split(' ');
	/**
	 * ID, Dice Coefficient, Token
	 */
	const entries: [number, number, string][] = [];

	const queryTokens = tokenizer(query);

	for (const [id, itemTokens] of Object.entries(links)) {
		let highestDiceCoefficient = 0;
		let bestToken = '';

		for (const qToken of queryTokens) {
			let maxDistance = -Infinity;

			for (const iToken of itemTokens) {
				const distance = diceCoefficient(qToken, iToken);

				if (distance > maxDistance) {
					maxDistance = distance;
					bestToken = iToken;
				}
			}
			if (maxDistance > highestDiceCoefficient) highestDiceCoefficient = maxDistance;
		}

		entries.push([Number(id), highestDiceCoefficient, bestToken]);
	}

	const sortedEntries = entries.sort((a, b) => b[1] - a[1]);

	return sortedEntries;
};
