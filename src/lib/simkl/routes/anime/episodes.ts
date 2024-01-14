import Simkl from '$lib/simkl';

export default async function getAnimeEpisodes(id: string): Promise<SEpisode[]> {
	return await Simkl.Client.get<SEpisode[]>(`anime/episodes/${id}?extended=full`);
}

export interface SEpisode {
	title: string;
	episode?: number;
	type: string;
	aired: boolean;
	img: string;
	date: string;
	ids: Ids;
}

export interface Ids {
	simkl_id: number;
}
