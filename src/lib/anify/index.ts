import ApiClient from './routes/utils/request';
import getSeasonalAnime from './routes/anime/seasonal';
import getSearchAnime from './routes/anime/search';
import getInfoAnime from './routes/anime/info';
import getAnimeEpisodes from './routes/anime/episodes';
import getAnimeSources from './routes/anime/sources';

export const anify = 'https://api.anify.tv/';

export default class Anify {
	public static Client = new ApiClient(anify);
	public static getSeasonalAnime = getSeasonalAnime;
	public static getSearchAnime = getSearchAnime;
	public static getInfoAnime = getInfoAnime;
	public static getAnimeEpisodes = getAnimeEpisodes;
	public static getAnimeSources = getAnimeSources;
}
