import Simkl from '$lib/simkl';
import type { Show } from '$lib/simkl/types';
import { GenrePopularity, GenreTypes, GenreYears, Genres } from '$lib/simkl/types/genre';

export default async function getGenreAnime(
	genre: Genres = Genres.all,
	genreType: GenreTypes = GenreTypes.all,
	year: GenreYears | string = GenreYears.thisWeek,
	popularity: GenrePopularity = GenrePopularity.popularThisMonth,
	cacheTtl: number = 60 * 60 * 24
): Promise<Show[]> {
	//sample anime/genres/drama/series/this-week/popular-this-month
	return await Simkl.Client.get<Show[]>(
		`anime/genres/${genre}${genreType}/${year}/${popularity}?extended=overview,metadata,tmdb,genres`,
		cacheTtl
	);
}
