<script lang="ts">
	import Collection from '$lib/components/Collection.svelte';
	import type { Show } from '$lib/simkl/types';
	import type { ICollection } from '$lib/simkl/types/Collection.js';
	import SvelteSeo from 'svelte-seo';
	interface Data {
		collections: ICollection[];
	}

	export let data: Data;
	let colelctions: ICollection[] = data.collections;
</script>

<SvelteSeo
	title="Kato - Watch Anime online with DUB and SUB for FREE"
	description="Kato is the best free anime streaming website with Ai-Tools where you can watch English Subbed and Dubbed anime online. WATCH NOW! No Ads GUARANTEED! "
	canonical="https://kato.to/collections"
	keywords="Anime to watch, watch anime,anime online, free anime online, online anime, anime streaming, stream anime online, english anime, english dubbed anime, Sub anime, Dub anime, Ai, Kato"
	openGraph={{
		title: 'Kato - Watch Anime online with DUB and SUB for FREE',
		//@ts-ignore
		Image: 'https://www.kitsunee.me/icon.png',
		description:
			'Kato is the best free anime streaming website with Ai-Tools where you can watch English Subbed and Dubbed anime online. WATCH NOW! No Ads GUARANTEED! ',
		url: 'https://kato.to/collections',
		type: 'website',
		site_name: 'Kato'
	}}
	twitter={{
		card: 'summary_large_image',
		site: '@Kat0TV',
		title: 'Kato - Watch Anime online with DUB and SUB for FREE',
		description:
			'Kato is the best free anime streaming website with Ai-Tools where you can watch English Subbed and Dubbed anime online. WATCH NOW! No Ads GUARANTEED! ',
		image: 'https://www.kitsunee.me/icon.png'
	}}
/>
<main id="page-content" class="flex flex-auto px-10 flex-col max-w-full">
	<div class="pb-20 wrapper border-t border-gray-700 pt-7">
		<h1 class="title">Collections</h1>
		<div class="grid grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1 gap-5">
			{#each colelctions as collection}
				<Collection
					title={collection.title}
					descriptor={collection.descriptor ?? 'The best of'}
					items={collection.items}
				/>
			{/each}
		</div>
		<button class="btn variant-filled-surface mt-10 w-full rounded-xl drop-shadow-md">
			Show more
		</button>
	</div>
</main>

<style>
	.title {
		margin-bottom: 2rem;
		font-size: 2rem;
		font-weight: bold;
	}
</style>
