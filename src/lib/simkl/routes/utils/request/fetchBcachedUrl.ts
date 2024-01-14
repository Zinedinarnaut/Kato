import {CacheBGet, CacheBSet} from '$lib/utils/bCache';

export async function fetchBrowserCachedUrl<T>(
	url: string,
	ttl: number = 60 * 60 * 24,
	RequestInit: RequestInit = {},
	key = ''
) {
	const cached = await CacheBGet(`url:${url}:key:${key}`);
	if (cached) {
		return JSON.parse(cached) as T;
	}
	const response = await fetch(url, RequestInit);

	const data: T = await response.json();

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}, message: ${data}`);
	}
	await CacheBSet(`url:${url}:key:${key}`, JSON.stringify(data), ttl);
	return data;
}
