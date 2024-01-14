import type { PageServerLoad } from '../../$types';
/** @type {import('./$types').PageServerLoad} */
export const load = (async ({ params }) => {
	const id = params.id;
	const user = params.user;
	return { id, user };
}) satisfies PageServerLoad;
export const ssr = true;
