export interface Stats {
	total_mins: number;
	movies: Movies;
	tv: Tv;
	anime: Anime;
	watched_last_week: watched_last_week;
}
export interface watched_last_week {
	anime_mins: number;

	movies_mins: number;

	total_mins: number;

	tv_mins: number;
}
export interface Movies {
	total_mins: number;
	plantowatch: Plantowatch;
	dropped: Dropped;
	completed: Completed;
}

export interface Plantowatch {
	mins: number;
	count: number;
}

export interface Dropped {
	mins: number;
	count: number;
}

export interface Completed {
	mins: number;
	count: number;
}

export interface Tv {
	total_mins: number;
	watching: Watching;
	hold: Hold;
	plantowatch: Plantowatch2;
	dropped: Dropped2;
	completed: Completed2;
}

export interface Watching {
	watched_episodes_count: number;
	count: number;
	left_to_watch_episodes: number;
	left_to_watch_mins: number;
	total_episodes_count: number;
}

export interface Hold {
	watched_episodes_count: number;
	count: number;
	left_to_watch_episodes: number;
	left_to_watch_mins: number;
	total_episodes_count: number;
}

export interface Plantowatch2 {
	watched_episodes_count: number;
	count: number;
	left_to_watch_episodes: number;
	left_to_watch_mins: number;
	total_episodes_count: number;
}

export interface Dropped2 {
	watched_episodes_count: number;
	count: number;
}

export interface Completed2 {
	watched_episodes_count: number;
	count: number;
}

export interface Anime {
	total_mins: number;
	watching: Watching2;
	hold: Hold2;
	plantowatch: Plantowatch3;
	dropped: Dropped3;
	completed: Completed3;
}

export interface Watching2 {
	watched_episodes_count: number;
	count: number;
	left_to_watch_episodes: number;
	left_to_watch_mins: number;
	total_episodes_count: number;
}

export interface Hold2 {
	watched_episodes_count: number;
	count: number;
	left_to_watch_episodes: number;
	left_to_watch_mins: number;
	total_episodes_count: number;
}

export interface Plantowatch3 {
	watched_episodes_count: number;
	count: number;
	left_to_watch_episodes: number;
	left_to_watch_mins: number;
	total_episodes_count: number;
}

export interface Dropped3 {
	watched_episodes_count: number;
	count: number;
}

export interface Completed3 {
	watched_episodes_count: number;
	count: number;
}
