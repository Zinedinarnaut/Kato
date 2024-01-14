// @ts-nocheck
import SearchConfig from '$lib/consumet/routes/AdvancedSearch/SearchConfig';
import { getAnilistAdvancedSearch } from '$lib/consumet/routes/AdvancedSearch/advancedSearch';
import { cSort, cStatus } from '$lib/consumet/routes/AdvancedSearch/types';
import type { PageServerLoad } from './$types';
/** */
export const load = (async ({ url }) => {
	const q = url.searchParams.get('q');
	const config = new SearchConfig();
	if (q && q != '') {
		config.Query = q;
		console.log(q);
	} else {
		config.Sort = [cSort.FavouritesDesc];
		config.Status = cStatus.Releasing;
	}
	console.log(config.ConfigToString());
	const results = await getAnilistAdvancedSearch(config);
	return { trending: results };
}) satisfies PageServerLoad;
