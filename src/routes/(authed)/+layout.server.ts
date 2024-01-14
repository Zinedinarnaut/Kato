import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async (request) => {
	const token = request.cookies.get('token');
	if (!token || token == '') {
		throw redirect(308, '/home');
	}
	return {};
}) satisfies LayoutServerLoad;
