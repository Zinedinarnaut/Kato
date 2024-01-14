import type Show from './show';

export interface WatchList {
	anime: Anime[];
}

export interface Anime {
	// last_watched_at: any;
	status: string;
	// user_rating: UserRating;
	// last_watched: any;
	next_to_watch: string;
	watched_episodes_count: number;
	total_episodes_count: number;
	not_aired_episodes_count: number;
	show: Show;
	anime_type: string;
}

//export interface UserRating {}
