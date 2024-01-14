import Anify from '$lib/anify';
import type { Episode, EpisodeData } from '$lib/anify/types';

export default async function getAnimeEpisodes(
	anilist?: string | null,
	mal?: string | null
): Promise<EpisodeData[]> {
	if (!anilist && !mal) {
		throw new Error('No id provided');
	}
	if (anilist) {
		return await getAnimeEpisodesAnilist(anilist);
	} else {
		return await getAnimeEpisodesMAL(mal!);
	}
}

async function getAnimeEpisodesAnilist(id: string): Promise<EpisodeData[]> {
	return await Anify.Client.get<EpisodeData[]>(`episodes?id=${id}`);
}

async function getAnimeEpisodesMAL(id: string): Promise<EpisodeData[]> {
	return await Anify.Client.get<EpisodeData[]>(`episodes-mal?id=${id}`);
}
