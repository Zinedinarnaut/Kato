import { localStorageStore } from '@skeletonlabs/skeleton';
import { writable, type Writable } from 'svelte/store';
import type { authed } from './types';
import type { continueWatch } from './types/continueWatching';
import type userSettings from './types/userSettings';

export const bCache: Writable<Record<string, { value: string; expires: number }>> =
	localStorageStore('katoAppCache', {});

export const auth: Writable<authed> = writable({ isAuthed: false });

export const continueWatching: Writable<continueWatch[]> = localStorageStore(
	'continueWatching',
	[]
);

export const settings: Writable<userSettings> = localStorageStore('userSettings', {
	isDub: false
});

export const autoSkip: Writable<boolean> = localStorageStore('autoSkip', false);
