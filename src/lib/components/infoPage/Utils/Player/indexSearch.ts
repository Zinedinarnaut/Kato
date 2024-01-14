import type { Episode } from '$lib/consumet/types';
import type { Splide } from '@splidejs/svelte-splide';

export default function indexSearch(
	episodeNumber: number,
	episodeSelections: {
		value: number;
		name: string;
		episodes: Episode[];
	}[],
	episodeSelectionsIndex: number,
	splideRef: Splide
) {
	const eps = episodeSelections[episodeSelectionsIndex].episodes;
	let indexToSet = 0;
	for (let index = 0; index < eps.length; index++) {
		const element = eps[index];
		if (element.number === episodeNumber) {
			indexToSet = index;
			break;
		}
	}
	splideRef.go(indexToSet);
}
