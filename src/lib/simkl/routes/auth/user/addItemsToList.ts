import { PUBLIC_SIMKL_ID } from '$env/static/public';
import type { Show, SyncStatus } from '$lib/simkl/types';
import Client from '../../client';

export async function addItemsToList(
	userToken: string,
	show: Show,
	to: SyncStatus
): Promise<boolean | null> {
	try {
		show.to = to;
		show.watched_at = new Date().toISOString();
		const body = { shows: [show] };
		const sync = await Client.post(
			`sync/add-to-list`,
			0,
			{
				body: JSON.stringify(body),
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + userToken,
					'simkl-api-key': PUBLIC_SIMKL_ID
				}
			},
			false
		);
		if (sync) return true;
	} catch {
		return null;
	}
	return null;
}
