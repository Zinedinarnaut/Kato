import Simkl from '$lib/simkl';
import { PUBLIC_SIMKL_ID } from '$env/static/public';
import type { UserSettings } from '$lib/simkl/types';

export async function getSettings(userToken: string): Promise<UserSettings | null> {
	try {
		const settings = await Simkl.Client.post<UserSettings>(
			`users/settings`,
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
		if (settings) return settings;
	} catch {
		return null;
	}
	return null;
}
