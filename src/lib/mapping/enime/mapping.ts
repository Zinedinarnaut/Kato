// @ts-ignore
import fetchCachedUrl from '$lib/simkl/routes/utils/request/fetchCachedUrl';

export async function getAllMappings(from: string, id: string): Promise<string | null> {
	const data = await fetchCachedUrl<any>(`https://api.enime.moe/mapping/${from}/${id}`);
	if (data && data.mappings) return data.mappings;

	return null;
}

export async function getMappings(from: string, id: string, to: string): Promise<string | null> {
	const data = await fetchCachedUrl<any>(`https://api.enime.moe/mapping/${from}/${id}`);
	if (data) {
		const toReturn = data.mappings[to];
		if (toReturn) return toReturn;
		else return null;
	} else {
		return null;
	}
}
