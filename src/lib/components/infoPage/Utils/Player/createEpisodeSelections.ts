import type { Episode } from '$lib/consumet/types';

export default function createEpisodeSelections(episodes: Episode[]) {
	if (!episodes) return [];
	const episodeSelections: { value: number; name: string; episodes: Episode[] }[] = [];
	for (let i = 1; i < episodes.length; i += 25) {
		const episodeGroup = episodes.slice(i, i + 25);
		const startEpisode = i;
		const endEpisode = i + episodeGroup.length;
		const selection = {
			value: i / 25,
			name: `Episodes ${startEpisode}-${endEpisode}`,
			episodes: episodeGroup
		};
		episodeSelections.push(selection);
	}
	return episodeSelections;
}
