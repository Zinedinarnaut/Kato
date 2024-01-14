import { bCache } from '$lib/stores';
import { get } from 'svelte/store';

export async function CacheBGet(key: string): Promise<string | null> {
	const cache = get(bCache);
	const results = cache[key];
	if (results) {
		if (results.expires < Date.now()) {
			delete cache[key];
			bCache.set(cache);
			return null;
		}
		if (Object.keys(bCache).length > 100) {
			for (const key of Object.keys(bCache)) {
				delete cache[key];
			}
			bCache.set(cache);
		}
		return results.value;
	}
	return null;
}

export async function CacheBSet(key: string, data: string, ttl: number) {
	const cache = get(bCache);
	cache[key] = { value: data, expires: Date.now() + ttl };
	bCache.set(cache);
}
