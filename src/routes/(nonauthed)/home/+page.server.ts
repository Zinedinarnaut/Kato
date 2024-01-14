import type { PageServerLoad } from './$types';
import Simkl from '$lib/simkl';
import { GenrePopularity, GenreTypes, GenreYears, Genres } from '$lib/simkl/types/genre';
import TMDB from '$lib/tmdb';
import { get } from 'svelte/store';
import { auth } from '$lib/stores';
import { SyncStatus } from '$lib/simkl/types';
// import Consument from '$lib/consumet';
// import SearchConfig, { adGenres } from '$lib/consumet/routes/advancedSearch';
import { convertDataToCollection } from '$lib/utils/convertDataToCollection';

//TODO: add clear logos
export const load = (async () => {
	const authInfo = get(auth);
	let randomLogo = null;

	// const searchConfig = new SearchConfig();
	// searchConfig.Genres = [adGenres.Action, adGenres.Adventure];
	// const test = await Consument.getAnilistAdvancedSearch(searchConfig);
	// console.log(test);
	const watchlist_promise = Simkl.Sync.getAllItems(authInfo.token, SyncStatus.watching, 'anime');

	const trending_promise = Simkl.getTrendingAnime();

	const random_promise = Simkl.getRandomCalendar();

	const collection_shounen = Simkl.getGenreAnime(
		Genres.shounen,
		GenreTypes.all,
		GenreYears.thisWeek,
		GenrePopularity.popularThisWeek
	);

	const collection_romance = Simkl.getGenreAnime(
		Genres.romance,
		GenreTypes.all,
		GenreYears.thisWeek,
		GenrePopularity.popularThisWeek
	);

	const collection_echii = Simkl.getGenreAnime(Genres.ecchi, GenreTypes.all, GenreYears.thisYear);

	const year_hot_movies = Simkl.getGenreAnime(
		Genres.all,
		GenreTypes.movies,
		GenreYears.thisYear,
		GenrePopularity.popularThisYear
	);

	const [shounen, romance, ecchi, hot_movies, random, trending, watchlist] = await Promise.all([
		collection_shounen,
		collection_romance,
		collection_echii,
		year_hot_movies,
		random_promise,
		trending_promise,
		watchlist_promise
	]);

	const images = random?.ids?.tmdb ? await TMDB.getImages(random?.ids.tmdb) : '';
	if (images) {
		const all = images.logos?.filter((x) => x !== null || undefined);
		const en = all?.filter((x) => x && x.iso_639_1 === 'en');
		const jp = all?.filter((x) => x && x.iso_639_1 === 'jp');
		let acceptedLogos = en;
		if (acceptedLogos.length == 0) {
			if (jp.length != 0) {
				acceptedLogos = jp;
			} else {
				acceptedLogos = all;
			}
		}
		if (acceptedLogos?.length > 0) {
			randomLogo = TMDB.getOriginalImage(
				acceptedLogos[Math.floor(Math.random() * acceptedLogos.length)]?.file_path
			);
		}

		let maxHeight = 0;
		images.backdrops.forEach((backdrop) => {
			if (backdrop.height > maxHeight) {
				maxHeight = backdrop.height;
			}
		});

		const posters = images.backdrops
			.filter((x) => x.height === maxHeight)
			.filter((x) => x.file_path !== undefined || x.file_path !== null);
		const poster = posters[Math.floor(Math.random() * posters.length)];
		if (random !== null) {
			const fanart = TMDB.getOriginalImage(poster.file_path);
			if (fanart) {
				random.fanart = fanart;
			}
		}
	}

	return {
		trending,
		random,
		hot_movies,
		randomLogo,
		watchlist,
		collections: [
			{
				...convertDataToCollection(ecchi, 'echii')
			},
			{
				...convertDataToCollection(romance, 'romance')
			},
			{
				...convertDataToCollection(shounen, 'shounen')
			}
		]
	};
}) satisfies PageServerLoad;
