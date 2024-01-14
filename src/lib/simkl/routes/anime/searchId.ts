import type { Show } from '$lib/simkl/types';
import StringBuilder from '$lib/utils/StringBuilder';
import Client from '../client';
export async function getSearchIdAnime(ids: { name: string; value: string }[]): Promise<Show> {
	const builder = new StringBuilder('?');

	ids.forEach((id) => {
		builder.Append(`${id.name}=${id.value}&`);
	});

	let finalStr = builder.toString().trimEnd();
	if (finalStr.endsWith('&')) {
		finalStr = finalStr.substring(0, finalStr.length - 1);
	}
	const info = await Client.get<Show[]>(`search/id${finalStr}`);
	return info[0];
}
