import Simkl from '$lib/simkl';
import type { Search } from '$lib/simkl/types';

export default async function getSearchAnime(q: string, page = 1, limit = 10): Promise<Search[]> {
	return await Simkl.Client.get<Search[]>(
		`search/anime?q=${q}&extended=full&page=${page}&limit=${limit}`
	);
}
