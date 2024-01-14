import type { SyncStatus } from './syncStatus';

export default interface Show {
	to?: SyncStatus;
	watched_at?: string;
	title: string;
	url?: string;
	poster: string;
	fanart?: string;
	ids?: Ids;
	release_date?: string;
	rank?: number | null;
	drop_rate?: string;
	watched?: number;
	plan_to_watch?: number;
	ratings: Ratings;
	country?: string;
	runtime?: string | null;
	status?: string;
	anime_type?: string;
	total_episodes?: number;
	network?: string | null;
	metadata?: string;
	overview?: string | null;
	genres?: string[] | null;
	trailer?: string;
	year?: number;
}
export interface Ids {
	simkl_id?: number;
	simkl?: number;
	slug?: string;
	anidb?: string;
	ann?: string;
	mal?: string;
	anfo?: string;
	offjp?: string;
	wikien?: string;
	wikijp?: string;
	allcin?: string;
	tw?: string;
	fb?: string;
	instagram?: string;
	tmdb?: string;
	imdb?: string;
	crunchyroll?: string;
	offen?: string;
	zap2it?: string;
	tvdbslug?: string;
	anilist?: string;
	animeplanet?: string;
	anisearch?: string;
	kitsu?: string;
	livechart?: string;
}
export interface Ratings {
	simkl?: SimklOrMal;
	mal?: Mal;
}
export interface SimklOrMal {
	rating?: number;
	votes?: number;
}
export interface Mal {
	rating?: number | null;
	votes?: number;
}
