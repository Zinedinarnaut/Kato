import { PUBLIC_SIMKL_ID } from '$env/static/public';

import Client from '../../client';
export interface inList {
	simkl: number;
	type: string;
	result: boolean;
	list: string;
	last_watched: string;
}
export async function checkItemList(userToken: string, simklId: number): Promise<inList | null> {
	try {
		const body = [
			{
				simkl: Number(simklId),
				type: 'show'
			}
		];
		const inList = await Client.post<inList[]>(
			`sync/watched`,
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
		if (inList) return inList[0];
	} catch {
		return null;
	}
	return null;
}
