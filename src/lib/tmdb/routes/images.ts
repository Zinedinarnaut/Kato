import TMDB from '..';
import type { Images } from '../types/images';

export async function getTmdbImages(id: string): Promise<Images | null> {
	try {
		return await TMDB.client.get<Images>(`tv/${id}/images`);
	} catch (e) {
		return null;
	}
}
export function getOriginalImage(filePath: string): string {
	return 'https://image.tmdb.org/t/p/original' + filePath;
}
