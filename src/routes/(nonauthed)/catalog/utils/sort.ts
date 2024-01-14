import type { cResult } from '$lib/consumet/routes/AdvancedSearch/types/cResponse';
import { SortTypes } from '../types/SortTypes';

const sortFunctions = {
	[SortTypes.titleAsc]: (a: cResult, b: cResult) => {
		const aTitle = a.title?.english ?? a.title?.romaji ?? a.title?.native ?? a.title?.userPreferred;
		const bTitle = b.title?.english ?? b.title.romaji ?? b.title?.native ?? b.title?.userPreferred;
		return aTitle.localeCompare(bTitle);
	},
	[SortTypes.titleDsc]: (a: cResult, b: cResult) => {
		const aTitle = a.title?.english ?? a.title?.romaji ?? a.title?.native ?? a.title?.userPreferred;
		const bTitle = b.title?.english ?? b.title.romaji ?? b.title?.native ?? b.title?.userPreferred;
		return bTitle.localeCompare(aTitle);
	},
	[SortTypes.yearAsc]: (a: cResult, b: cResult) => {
		const aDate = new Date(a.releaseDate);
		const bDate = new Date(b.releaseDate);
		return aDate.valueOf() - bDate.valueOf();
	},
	[SortTypes.yearDsc]: (a: cResult, b: cResult) => {
		const aDate = new Date(a.releaseDate);
		const bDate = new Date(b.releaseDate);
		return bDate.valueOf() - aDate.valueOf();
	},
	[SortTypes.rankAsc]: (a: cResult, b: cResult) => a.popularity - b.popularity,
	[SortTypes.rankDsc]: (a: cResult, b: cResult) => b.popularity - a.popularity
};
export default sortFunctions;
