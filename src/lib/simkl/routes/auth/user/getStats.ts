import Simkl from '$lib/simkl';
import { PUBLIC_SIMKL_ID } from '$env/static/public';
import type { Stats } from '$lib/simkl/types';

export async function getStats(userToken: string, userId: string): Promise<Stats | null> {
	try {
		const stats = await Simkl.Client.post<Stats>(
			`users/${userId}/stats`,
			0,
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + userToken,
					'simkl-api-key': PUBLIC_SIMKL_ID
				}
			},
			false
		);
		if (stats) return stats;
	} catch {
		return null;
	}
	return null;
}
