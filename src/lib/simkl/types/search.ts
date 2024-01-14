export interface Search {
	title: string;
	title_romaji: string;
	year: number;
	type: string;
	poster: string;
	all_titles: string[];
	url: string;
	ep_count: number;
	rank: unknown;
	status: string;
	ratings: Ratings;
	ids: Ids;
	title_en?: string;
}

export interface Ratings {
	simkl: Simkl;
	imdb?: Imdb;
	mal?: Mal;
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

export interface Ids {
	simkl_id: number;
	slug: string;
	tmdb?: string;
}
