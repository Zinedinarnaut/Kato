import Simkl from '$lib/simkl';
import { auth } from '$lib/stores';
import type { authed } from '$lib/types';
import type { LayoutServerLoad } from './$types';

export const load = (async (request) => {
	const { pathname } = request.url;
	const token = request.cookies.get('token');
	let authed: authed | null;
	authed = { isAuthed: false };
	if (token) {
		const settings = await Simkl.getSettings(token);
		if (settings) {
			authed = {
				isAuthed: true,
				token,
				userSettings: settings
			};
		}
	}
	auth.set(authed);

	return {
		authed,
		pathname
	};
}) satisfies LayoutServerLoad;
