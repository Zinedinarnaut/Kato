export interface cResponse {
	currentPage: number;
	hasNextPage: boolean;
	totalPages: number;
	totalResults: number;
	results: cResult[];
}

export interface cResult {
	id: string;
	malId: number;
	title: cTitle;
	status: string;
	image: string;
	cover: string;
	popularity: number;
	totalEpisodes: number;
	countryOfOrigin: string;
	description: string;
	genres: string[];
	rating: number;
	color: string;
	type: string;
	releaseDate: number;
}

export interface cTitle {
	romaji: string;
	english: string;
	native: string;
	userPreferred: string;
}
