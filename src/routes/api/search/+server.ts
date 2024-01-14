import Simkl from '$lib/simkl';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

//TODO set type
export const GET = async function ({ url }) {
	const q = url.searchParams.get('q');
	if (!q) return json({ error: 'No query provided' });
	const results = await Simkl.getSearchAnime(q);
	if (!results) return json({ error: 'No results found' });
	return json(results);
} satisfies RequestHandler;
