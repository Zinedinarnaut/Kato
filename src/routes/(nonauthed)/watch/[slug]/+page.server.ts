import Anilist from '$lib/anilist';
import Simkl from '$lib/simkl';
import { checkItemList, type inList } from '$lib/simkl/routes/auth/user/checkItemList';
import { auth } from '$lib/stores';
import { get } from 'svelte/store';
import type { PageServerLoad } from './$types';
import { getSearchIdAnime } from '$lib/simkl/routes/anime/searchId';
import { error } from '@sveltejs/kit';
import Anify from '$lib/anify';
/** @type {import('./$types').PageServerLoad} */
export const load = (async ({ url }) => {
	let id = url.searchParams.get('id');
	if (!id) throw error(404, 'Please provide id');
	if (id === 'search') {
		const malId = url.searchParams.get('malId');
		const anilistId = url.searchParams.get('anilistId');
		const show = await getSearchIdAnime([
			{ name: 'anilist', value: anilistId ?? '' },
			{ name: 'mal', value: malId ?? '' }
		]);
		if (show.ids?.simkl) id = show.ids?.simkl.toString();
	}
	const authInfo = get(auth);
	//check  if episodeNumber is a number

	const info = await Simkl.getInfoAnime(id);

	const Characters = Anilist.getCharacters(info.ids?.anilist);

	const [characters] = await Promise.all([Characters]);

	//const episodes = { sub: subEpisodes, dub: dubEpisodes };
	let isInList: inList | null = null;

	if (authInfo.token) {
		isInList = await checkItemList(authInfo.token, info.ids.simkl);
	}

	const episodes_promise = Anify.getAnimeEpisodes(info.ids?.anilist, info.ids?.mal);
	const simklEpisodes_promise = Simkl.getAnimeEpisodes(info.ids.simkl.toString());

	const [episodes, simklEpisodes] = await Promise.all([episodes_promise, simklEpisodes_promise]);

	episodes.forEach((episode, i) => {
		episode.episodes.forEach((ep, j) => {
			if (!episodes[i].episodes[j].img) {
				const epi = simklEpisodes.find((x) => x.episode == ep.number);
				const newImg = epi?.img;
				episodes[i].episodes[j].img = newImg
					? 'https://api.streamsora.live/utils/image-proxy?url=https://simkl.in/episodes/' + newImg + '_w.webp'
					: '';
				if (epi?.title) episodes[i].episodes[j].title = epi?.title;
			}
		});
	});
	const date = simklEpisodes.find((x) => x.aired == false)?.date
		? simklEpisodes.find((x) => x.aired == false)?.date + ':00'
		: undefined;
	const nextEpisodeDate: Date | undefined = date ? new Date(date) : undefined;

	return { info: info, characters, isInList, episodes, nextEpisodeDate };
}) satisfies PageServerLoad;
export const ssr = true;
