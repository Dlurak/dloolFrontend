import type { navData } from '../constants/nav';

type navDataType = (typeof navData)[number];

export type footerCategoryType = navDataType['footerCategory'];

export interface NavDataEntry {
	title: navDataType['title'];
	uri: navDataType['uri'];
	showInNav: boolean;
	navBoxIcon: navDataType['navBoxIcon'];
	showInFooter: boolean;
	footerCategory: footerCategoryType;
}
