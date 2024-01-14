import Anify from '$lib/anify';
import type { Anime } from '$lib/anify/types';

export default async function getSearchAnime(q: string): Promise<Anime[]> {
	return await Anify.Client.get<Anime[]>(
		`search?type=anime&query=${encodeURIComponent(q)}`
	);
}
