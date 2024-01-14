import Anify from '$lib/anify';
import type { Anime } from '$lib/anify/types';

export default async function getInfoAnime(id: string): Promise<Anime> {
	return await Anify.Client.get<Anime>(`info?id=${id}`);
}

