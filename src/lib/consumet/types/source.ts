export interface EpisodeSource {
	intro: Intro;
	headers: Headers;
	sources: Source[];
	download: string;
	subtitles: Subtitle[];
}
export interface Intro {
	start: number;
	end: number;
}
export interface Subtitle {
	url: string;
	lang: string;
}
export interface Headers {
	Referer: string;
}

export interface Source {
	url: string;
	isM3U8: boolean;
	quality: string;
}
