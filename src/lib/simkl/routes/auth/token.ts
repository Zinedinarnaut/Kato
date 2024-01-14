import Simkl from '$lib/simkl';
import { SIMKL_SECRET } from '$env/static/private';
import { PUBLIC_REDIRECT_URL, PUBLIC_SIMKL_ID } from '$env/static/public';
interface AuthResponse {
	access_token: string;
	token_type: string;
	scope: string;
}
export async function getToken(code: string, url = PUBLIC_REDIRECT_URL): Promise<string> {
	const body = JSON.stringify({
		code: code,
		client_id: PUBLIC_SIMKL_ID,
		client_secret: SIMKL_SECRET,
		redirect_uri: url,
		grant_type: 'authorization_code'
	});
	const token = await Simkl.Client.post<AuthResponse>(`oauth/token`, 0, {
		body: body,
		headers: {
			'Content-Type': 'application/json'
		}
	});
	return token.access_token;
}
