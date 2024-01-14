import { CacheGet, CacheSet } from '$lib/utils/cache';

class ApiClient {
	private readonly baseURL: string;

	constructor(
		baseURL = 'https://api.anify.tv/'
	) {
		this.baseURL = baseURL;
	}

	private async request<T>(
		url: string,
		config: RequestInit = {},
		ttl: number
	): Promise<T> {
		const finalUrl = new URL(this.baseURL + url + "");

		const cached = await CacheGet(`url:${finalUrl}`);
		if (cached) {
			return JSON.parse(cached) as T;
		}

		const response = await fetch(finalUrl, config);

		const json = await response.json();
		const data: T = json;

		if (response.status !== 200 || json.error) {
			throw new Error(`HTTP error! status: ${response.status}, message: ${data}`);
		}
		await CacheSet(`url:${finalUrl}`, JSON.stringify(data), ttl);
		return data;
	}

	public async get<T>(
		url: string,
		ttl: number = 60 * 60 * 24,
		config: RequestInit = {}
	): Promise<T> {
		return this.request<T>(url, { method: 'GET', ...config }, ttl);
	}
	public async post<T>(
		url: string,
		ttl: number = 60 * 60 * 24,
		config: RequestInit = {}
	): Promise<T> {
		return this.request<T>(url, { method: 'POST', ...config }, ttl);
	}
}

export default ApiClient;
