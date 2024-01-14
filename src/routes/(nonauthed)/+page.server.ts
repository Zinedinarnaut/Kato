import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

//TODO: add clear logos
export const load = (async (request) => {
	const visited = request.cookies.get('visited');
	console.log(visited);
	if (visited == 'yes') {
		console.log(visited);
		throw redirect(308, '/home');
	}

	return {};
}) satisfies PageServerLoad;
