import { fetchBrowserCachedUrl } from '$lib/simkl/routes/utils/request/fetchBcachedUrl';
import type { Characters } from '../types';

export async function getCharacters(id: string): Promise<Characters | null> {
	try {
		const query = `{
            Media(id: ${id}) {
              characters(sort:FAVOURITES_DESC) {
                edges { 
                  id
                  role
                  node {
                    name {
                      first
                      last
                      full
                      native
                      userPreferred
                    }
                    image {
                      large
                    }
                  }
                  voiceActorRoles {
                    voiceActor {
                      id
                      name {
                        first
                        middle
                        last
                        full
                        native
                        userPreferred
                      }
                      image {
                        large
                      }
                    }
                  }
                }
              }
            }
        }`;
		const characters = await fetchBrowserCachedUrl<Characters>(
			`https://graphql.anilist.co`,
			900000,
			{
				body: JSON.stringify({ query: query }),
				method: 'POST',
				headers: { 'Content-Type': 'application/json' }
			},
			id
		);
		return characters;
	} catch {
		return null;
	}
}
