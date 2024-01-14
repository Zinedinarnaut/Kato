import ApiClient from './routes/utils/request';
import getTrendingAnime from './routes/anime/trending';
import getBestAnime from './routes/anime/best';
import getSearchAnime from './routes/anime/search';
import getGenreAnime from './routes/anime/genre';
import getInfoAnime from './routes/anime/info';
import { getRandomAnime, getRandomCalendar } from './routes/anime/random';
import { getToken } from './routes/auth/token';
import { getAllItems } from './routes/auth/user/getAllItems';
import { getSettings } from './routes/auth/user/settings';
import { getStats } from './routes/auth/user/getStats';
import { addItemsToList } from './routes/auth/user/addItemsToList';
import getAnimeEpisodes from './routes/anime/episodes';
export default class Simkl {
	public static Client = new ApiClient();
	public static getTrendingAnime = getTrendingAnime;
	public static getBestAnime = getBestAnime;
	public static getSearchAnime = getSearchAnime;
	public static getGenreAnime = getGenreAnime;
	public static getInfoAnime = getInfoAnime;
	public static getRandomAnime = getRandomAnime;
	public static getRandomCalendar = getRandomCalendar;
	public static getToken = getToken;
	public static getSettings = getSettings;
	public static getAnimeEpisodes = getAnimeEpisodes;
	public static Sync = {
		getAllItems,
		getStats,
		addItemsToList
	};
}
