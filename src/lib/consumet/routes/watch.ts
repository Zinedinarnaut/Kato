import { PUBLIC_API_URL } from '$env/static/public';
import { fetchBrowserCachedUrl } from '$lib/simkl/routes/utils/request/fetchBcachedUrl';
import type { EpisodeSource } from '../types';

export async function getWatch(id: string, isDub = false): Promise<EpisodeSource | null> {
	try {
		if (!isDub) {
			return await fetchBrowserCachedUrl<EpisodeSource>(
				`${PUBLIC_API_URL}/meta/anilist/watch/${id}?dub=${isDub}&provider=zoro`,
				300000
			);
		} else {
			return await fetchBrowserCachedUrl<EpisodeSource>(
				`https://api.streamable.moe/api/anilist/watch/${id}?dub=${isDub}`,
				300000
			);
		}
	} catch {
		return null;
	}
}
