import Consument from '$lib/consumet';
import type { Episode } from '$lib/consumet/types';
import type Artplayer from 'artplayer';
export default async function changeVidSrc(
	episode: number,
	episodes: Episode[],
	isDub: boolean,
	artRef: Artplayer
) {
	const stream = await Consument.watch(episodes[episode].id, isDub);
	let url = stream?.sources.find((x) => x.quality === 'auto' || x.quality === 'default')?.url;
	//filter sources by quality and get the heightest quality
	if (!url) {
		url =
			stream?.sources
				.filter((x) => x.quality !== 'auto' && x.quality !== 'default')
				.sort((a, b) => parseInt(b.quality) - parseInt(a.quality))[0]?.url ?? '';
	}
	artRef.switchUrl('https://m3u8.streamsora.live/proxy/m3u8/' + encodeURIComponent(url));
	return episode;
}
