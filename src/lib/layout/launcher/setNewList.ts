import type { Token } from '../../../languages/i18n';
import { launcherLinks, launcherSearchTerm, unfilteredLauncherLinks } from '../../../stores';
import type { launcherLink } from '../../../types/launcher';

type LauncherLinkWithoutIdOrMatchingword = Omit<
	launcherLink<Token>,
	'id' | 'matchingWord' | 'showSimpelfied'
>;

export const setNewList = (list: LauncherLinkWithoutIdOrMatchingword[]) => {
	const newList = list.map((link, index) => ({
		...link,
		id: index,
		matchingWord: '',
		showSimpelfied: true
	}));
	unfilteredLauncherLinks.set(newList);
	launcherLinks.set(newList);

	launcherSearchTerm.set('');
};
