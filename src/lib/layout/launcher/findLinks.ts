import { diceCoefficient } from 'dice-coefficient';

export const findLinks = (query: string, links: Record<number, string[]>) => {
	const resultIds: Record<number, number> = {};
	const tokenizer = (str: string) => str.toLowerCase().split(' ');

	const queryTokens = tokenizer(query);

	for (const [id, itemTokens] of Object.entries(links)) {
		let highestDiceCoefficient = 0;

		for (const qToken of queryTokens) {
			let maxDistance = -Infinity;

			for (const iToken of itemTokens) {
				const distance = diceCoefficient(qToken, iToken);

				if (distance > maxDistance) maxDistance = distance;
			}
			if (maxDistance > highestDiceCoefficient) highestDiceCoefficient = maxDistance;
		}

		resultIds[Number(id)] = highestDiceCoefficient;
	}

	const entries = Object.entries(resultIds);
	const sortedEntries = entries.sort((a, b) => b[1] - a[1]);

	return sortedEntries;
};
