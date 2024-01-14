import { getAnilistAdvancedSearch } from './routes/AdvancedSearch/advancedSearch';
import { getAnilistEpisodes, getMALEpisodes } from './routes/episodes';
import { getWatch } from './routes/watch';

export default class Consument {
	public static getAnilistEpisodes = getAnilistEpisodes;
	public static getMALEpisodes = getMALEpisodes;
	public static watch = getWatch;
	public static getAnilistAdvancedSearch = getAnilistAdvancedSearch;
}
