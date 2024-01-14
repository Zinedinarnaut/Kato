import Simkl from '$lib/simkl';
import { Interval, type Show } from '$lib/simkl/types';

export default async function getTrendingAnime(
	interval: Interval = Interval.week
): Promise<Show[]> {
	const data = await Simkl.Client.get<Show[]>(
		`anime/trending/${interval.toString()}?extended=overview,metadata,tmdb,genres`
	);
	return data;
}
