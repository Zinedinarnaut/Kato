export interface Info {
	title: string;
	year: number;
	type: string;
	ids: Ids;
	year_start_end: string;
	en_title: unknown;
	alt_titles: AltTitle[];
	anime_type: string;
	studios: Studio[];
	season_name_year: string;
	rank: number;
	poster: string;
	fanart: string;
	first_aired: string;
	airs: Airs;
	runtime: number;
	certification: string;
	overview: string;
	genres: string[];
	country: string;
	total_episodes: number;
	status: string;
	network: string;
	ratings: Ratings;
	trailers: Trailer[];
	users_recommendations: UsersRecommendation[];
	relations: Relation[];
}

export interface Ids {
	simkl: number;
	slug: string;
	anidb: string;
	ann: string;
	mal: string;
	anfo: string;
	offjp: string;
	wikien: string;
	wikijp: string;
	allcin: string;
	tw: string;
	fb: string;
	instagram: string;
	tmdb: string;
	imdb: string;
	crunchyroll: string;
	offen: string;
	zap2it: string;
	tvdbslug: string;
	anilist: string;
	animeplanet: string;
	anisearch: string;
	kitsu: string;
	livechart: string;
}

export interface AltTitle {
	name: string;
	lang: number;
	type: string;
}

export interface Studio {
	id: number;
	name: string;
}

export interface Airs {
	day: string;
	time: string;
	timezone: string;
}

export interface Ratings {
	simkl: Simkl;
	imdb: Imdb;
	mal: Mal;
}

export interface Simkl {
	rating: number;
	votes: number;
}

export interface Imdb {
	rating: number;
	votes: number;
}

export interface Mal {
	rating: number;
	votes: number;
	rank: number;
}

export interface Trailer {
	name: string;
	youtube: string;
	size: number;
}

export interface UsersRecommendation {
	title: string;
	en_title?: string;
	year: number;
	poster: string;
	anime_type: string;
	users_percent: string;
	users_count: number;
	ids: Ids2;
}

export interface Ids2 {
	simkl: number;
	slug: string;
}

export interface Relation {
	title: string;
	en_title?: string;
	year: number;
	poster: string;
	anime_type: string;
	relation_type: string;
	is_direct: boolean;
	ids: Ids3;
}

export interface Ids3 {
	simkl: number;
	slug: string;
}
