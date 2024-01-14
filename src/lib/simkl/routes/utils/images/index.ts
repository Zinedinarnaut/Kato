export function getLargePoster(url: string | undefined): string {
	if (!url) return '';
	if (url?.includes('http')) return url;
	return `https://simkl.in/posters/${url}_m.webp`;
}

export function getLargeFanart(url: string | undefined): string {
	if (!url) return '';
	if (url?.includes('http')) return url;
	return `https://simkl.in/fanart/${url}_medium.webp`;
}
