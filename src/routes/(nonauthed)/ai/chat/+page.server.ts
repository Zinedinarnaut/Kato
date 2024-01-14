import Simkl from '$lib/simkl';
import { SyncStatus } from '$lib/simkl/types';
import { auth } from '$lib/stores';
import { get } from 'svelte/store';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const authed = get(auth);
	let plantowatch_promise;
	let completed_promise;
	let watching_promise;
	if (authed?.isAuthed && authed?.token) {
		plantowatch_promise = Simkl.Sync.getAllItems(authed?.token, SyncStatus.plantowatch);
		completed_promise = Simkl.Sync.getAllItems(authed?.token, SyncStatus.completed);
		watching_promise = Simkl.Sync.getAllItems(authed?.token, SyncStatus.watching);
	}
	const [planToWatch, completed, watching] = await Promise.all([
		plantowatch_promise,
		completed_promise,
		watching_promise
	]);
	return {
		list: {
			watching: watching,
			planToWatch: planToWatch,
			completed: completed
		}
	};
}) satisfies PageServerLoad;
