import type { UserSettings } from '$lib/simkl/types';

export interface authed {
	isAuthed: boolean;
	token?: string;
	userSettings?: UserSettings;
}
