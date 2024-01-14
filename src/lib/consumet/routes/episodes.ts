import { PUBLIC_API_URL } from '$env/static/public';
import { fetchBrowserCachedUrl } from '$lib/simkl/routes/utils/request/fetchBcachedUrl';
import type { Episode } from '../types';

export async function getAnilistEpisodes(
	id: string,
	isDub = false,
	isZoro = true
): Promise<Episode[]> {
	try {
		const episodes = await fetchBrowserCachedUrl<Episode[]>(
			`${PUBLIC_API_URL}/meta/anilist/episodes/${id}?dub=${isDub}` +
				(isZoro ? '&provider=zoro' : 'gogoanime'),
			900000
		);

		if (!episodes) return [];
		return episodes;
	} catch {
		return [];
	}
}
export async function getMALEpisodes(id: string, isDub = false, isZoro = true): Promise<Episode[]> {
	try {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const info = await fetchBrowserCachedUrl<any>(
			`${PUBLIC_API_URL}/meta/mal/info/${id}?dub=${isDub}` + (isZoro ? '&provider=zoro' : ''),
			300000
		);
		const episodes = info.episodes as Episode[];
		if (!episodes) return [];
		return episodes;
	} catch {
		return [];
	}
}
