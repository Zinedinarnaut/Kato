import Simkl from '$lib/simkl';
import { PUBLIC_SIMKL_ID } from '$env/static/public';
import type { SyncStatus, WatchList } from '$lib/simkl/types';

export async function getAllItems(
	userToken: string | undefined,
	status: SyncStatus | string,
	type = 'anime'
): Promise<WatchList | null> {
	try {
		if (!userToken) return null;
		const watchList = await Simkl.Client.get<WatchList>(
			`sync/all-items/${type}/${status}`,
			10,
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + userToken,
					'simkl-api-key': PUBLIC_SIMKL_ID
				}
			},
			false
		);
		if (watchList) return watchList;
	} catch (e) {
		return null;
	}
	return null;
}
