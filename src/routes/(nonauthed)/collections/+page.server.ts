import Simkl from '$lib/simkl';
import { getLargePoster } from '$lib/simkl/routes/utils/images';
import type { ICollection } from '$lib/simkl/types/Collection';
import { GenrePopularity, GenreTypes, GenreYears, Genres } from '$lib/simkl/types/genre';
import { convertDataToCollection } from '$lib/utils/convertDataToCollection';
import type { PageServerLoad } from '../$types';
/** @type {import('./$types').PageServerLoad} */
export const load = (async () => {
	const collection_shounen = Simkl.getGenreAnime(
		Genres.shounen,
		GenreTypes.all,
		GenreYears.thisWeek,
		GenrePopularity.popularThisWeek
	);

	const collection_echii = Simkl.getGenreAnime(Genres.ecchi, GenreTypes.all, GenreYears.thisYear);

	const collection_action = Simkl.getGenreAnime(
		Genres.action,
		GenreTypes.all,
		GenreYears.thisWeek,
		GenrePopularity.popularThisWeek
	);

	const bestOfAllTime = Simkl.getGenreAnime(Genres.all, GenreTypes.all);

	return {
		collections: [
			{
				...convertDataToCollection(await collection_shounen, 'Shounen'),
				descriptor: 'Popular this week'
			},
			{
				...convertDataToCollection(await collection_echii, 'Ecchi'),
				descriptor: 'Best of the year'
			},
			{
				...convertDataToCollection(await collection_action, 'Action'),
				descriptor: 'Popular this week'
			},
			{
				...convertDataToCollection(await bestOfAllTime, 'All'),
				descriptor: 'Best of all time'
			}
		]
	};
}) satisfies PageServerLoad;
