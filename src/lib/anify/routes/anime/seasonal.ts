import Anify from '$lib/anify';
import type {Seasonal} from '$lib/anify/types';

export default async function getTrendingAnime(): Promise<Seasonal> {
	return await Anify.Client.get<Seasonal>(
		`seasonal?type=anime`
	);
}
