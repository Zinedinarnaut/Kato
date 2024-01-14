// @ts-nocheck
import type { PageServerLoad } from './$types';
import Simkl from '$lib/simkl';
/** */
export const load = (async ({ url }) => {
	const code = url.searchParams.get('code');
	const token = code ? await Simkl.getToken(code) : null;
	return { token };
}) satisfies PageServerLoad;
