import Simkl from '$lib/simkl';
import type { Info, Random, Show } from '$lib/simkl/types';
import { fetchBrowserCachedUrl } from '../utils/request/fetchBcachedUrl';
export async function getRandomAnime(): Promise<Info | null> {
	const random: Random = await getRandomId();
	if (random.simkl_id === (undefined || null)) return null;
	return await Simkl.getInfoAnime(random.simkl_id.toString());
}

async function getRandomId(): Promise<Random> {
	const random: Random = await Simkl.Client.get<Random>(
		`search/random?service=simkl&type=anime&year_from=2022&genre=shounen`,
		5
	);
	return random;
}

const randomCache: { id: string; expires: number; data: Info | null } = {
	id: 'random-calendar',
	expires: 0,
	data: null
};

export async function getRandomCalendar(): Promise<Info | null> {
	const now = Date.now();

	// Check if the cached data is available and not expired
	if (randomCache.data && randomCache.expires > now) {
		return randomCache.data;
	}

	const data = await fetchBrowserCachedUrl<Show[]>('https://data.simkl.in/calendar/anime.json');

	if (data) {
		const anime = data
			.filter((x) => (x.ids?.tmdb && x.rank != null) || undefined)
			.filter((x) => x.anime_type === 'tv')
			// .sort((a, b) => (b.ratings?.simkl?.rating ?? 0) - (a.ratings?.simkl?.rating ?? 0))
			.sort((a, b) => (b.ratings.simkl?.votes ?? 0) - (a.ratings.simkl?.votes ?? 0))
			.slice(0, 15);

		const show = anime[Math.floor(Math.random() * anime.length)];
		if (show?.ids?.simkl_id === undefined || show?.ids?.simkl_id === null) {
			return null;
		}

		const final = await Simkl.getInfoAnime(show?.ids?.simkl_id.toString());

		// Cache the data
		randomCache.data = final;
		randomCache.expires = now + 300;

		return final;
	} else {
		return null;
	}
}
