import Simkl from '$lib/simkl';
import type { PageServerLoad } from './$types';
import { SyncStatus } from '$lib/simkl/types';
export const load = (async (request) => {
	let id: number | null = null;
	if (request.url.searchParams.has('id')) {
		id = Number(request.url.searchParams.get('id'));
	}
	const token = request.cookies.get('token');
	const authed = { token: token, userSettings: token ? await Simkl.getSettings(token) : null };
	let plantowatch;
	let completed;
	let watching;
	let onHold;
	let dropped;
	let stats_promise;

	if (authed.token) {
		plantowatch = Simkl.Sync.getAllItems(authed?.token, SyncStatus.plantowatch);
		completed = Simkl.Sync.getAllItems(authed?.token, SyncStatus.completed);
		watching = Simkl.Sync.getAllItems(authed?.token, SyncStatus.watching);
		onHold = Simkl.Sync.getAllItems(authed?.token, SyncStatus.hold);
		dropped = Simkl.Sync.getAllItems(authed?.token, SyncStatus.dropped);
		if (authed?.userSettings?.account.id)
			stats_promise = Simkl.Sync.getStats(
				authed?.token,
				authed.userSettings?.account.id.toString()
			);
	}
	const [planToWatch, finished, List, OnHOld, Dropped, stats] = await Promise.all([
		plantowatch,
		completed,
		watching,
		onHold,
		dropped,
		stats_promise
	]);
	return {
		planToWatch,
		finished,
		List,
		OnHOld,
		Dropped,
		stats,
		id
	};
}) satisfies PageServerLoad;
