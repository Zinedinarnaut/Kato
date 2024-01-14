import ApiClient from '$lib/simkl/routes/utils/request';
import { getTmdbImages, getOriginalImage } from './routes/images';

export default class TMDB {
	public static client = new ApiClient(
		'https://api.themoviedb.org/3/',
		'5201b54eb0968700e693a30576d7d4dc',
		'api_key'
	);
	public static getImages = getTmdbImages;
	public static getOriginalImage = getOriginalImage;
}
