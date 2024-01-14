export interface requested_formats {
	asr?: number;
	filesize: number;
	format_id: string;
	format_note: string;
	source_preference: number;
	fps?: number;
	audio_channels?: number;
	height?: number;
	quality: number;
	has_drm: boolean;
	tbr: number;
	url: string;
	width?: number;
	language: unknown;
	language_preference: number;
	preference: unknown;
	ext: string;
	vcodec: string;
	acodec: string;
	dynamic_range?: string;
	vbr?: number;
	protocol: string;
	fragments: Fragment[];
	container: string;
	resolution: string;
	aspect_ratio?: number;
	http_headers: HttpHeaders;
	video_ext: string;
	audio_ext: string;
	format: string;
	abr?: number;
}

export interface Fragment {
	url: string;
}

export interface HttpHeaders {
	'User-Agent': string;
	Accept: string;
	'Accept-Language': string;
	'Sec-Fetch-Mode': string;
	Referer: string;
}
