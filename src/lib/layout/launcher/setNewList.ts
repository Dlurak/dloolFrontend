import { launcherLinks, unfilteredLauncherLinks } from '../../../stores';
import type { launcherLink } from '../../../types/launcher';

type LauncherLinkWithoutIdOrMatchingword = Omit<launcherLink, 'id' | 'matchingWord'>;

export const setNewList = (list: LauncherLinkWithoutIdOrMatchingword[]) => {
	const newList = list.map((link, index) => ({
		...link,
		id: index,
		matchingWord: ''
	}));
	unfilteredLauncherLinks.set(newList);
	launcherLinks.set(newList);
};
