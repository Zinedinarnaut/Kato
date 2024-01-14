import Simkl from '$lib/simkl';
import { BestFilter, BestType, type Show } from '$lib/simkl/types';

export default async function getBestAnime(
	filter: BestFilter = BestFilter.voted,
	type: BestType = BestType.tv
): Promise<Show[]> {
	return await Simkl.Client.get<Show[]>(`anime/best/${filter}?type=${type}`);
}
