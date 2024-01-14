import { PUBLIC_SIMKL_ID } from '$env/static/public';
import type { Show } from '$lib/simkl/types';
import Client from '../../client';

export async function removeItemFromList(userToken: string, show: Show): Promise<boolean | null> {
	try {
		const body = { shows: [show] };
		const sync = await Client.post(
			`sync/history/remove`,
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
