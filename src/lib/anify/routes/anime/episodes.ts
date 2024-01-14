import Anify from '$lib/anify';
import type { Episode, EpisodeData } from '$lib/anify/types';

export default async function getAnimeEpisodes(
	anilist?: string | null,
): Promise<EpisodeData[]> {
	if (!anilist) {
		throw new Error('No id provided');
	}

	return await getAnimeEpisodesAnilist(anilist);
}

async function getAnimeEpisodesAnilist(id: string): Promise<EpisodeData[]> {
	return await Anify.Client.get<EpisodeData[]>(`episodes?id=${id}`);
}
