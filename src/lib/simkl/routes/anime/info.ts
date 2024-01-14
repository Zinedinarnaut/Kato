import Simkl from '$lib/simkl';
import type { Info } from '$lib/simkl/types';

export default async function getInfoAnime(id: string): Promise<Info> {
	return await Simkl.Client.get<Info>(`anime/${id}?extended=full`);
}
