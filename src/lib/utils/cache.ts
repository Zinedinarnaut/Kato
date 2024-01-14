const cache: Record<string, { value: string; expires: number }> = {};
const maxKeys = 100;
export async function CacheGet(key: string): Promise<string | null> {
	const results = cache[key];
	if (results) {
		if (results.expires < Date.now()) {
			delete cache[key];
			return null;
		}
		if (Object.keys(cache).length > maxKeys) {
			for (const key of Object.keys(cache)) {
				delete cache[key];
			}
		}
		return results.value;
	}
	return null;
}

export async function CacheSet(key: string, data: string, ttl: number) {
	cache[key] = { value: data, expires: Date.now() + ttl };
}
