<script lang="ts">
	export let data;
	let collections: ICollection[] = data.collections;
	import Carousel from '$lib/components/Carousel.svelte';
	// import Artplayer from 'artplayer';
	import '@splidejs/svelte-splide/css/sea-green';
	import SvelteSeo from 'svelte-seo';
	import { onMount } from 'svelte';
	import Hero from '$lib/components/Hero.svelte';
	import CollectionContainer from '$lib/components/CollectionContainer.svelte';
	import WideContainer from '$lib/components/WideContainer.svelte';
	import type { Show } from '$lib/simkl/types';
	import ItemCard from '$lib/components/ItemCard.svelte';
	import { fly } from 'svelte/transition';
	import { get } from 'svelte/store';
	import type { Data } from '@skeletonlabs/skeleton/dist/utilities/DataTable/types.js';
	import type { ICollection } from '$lib/simkl/types/Collection.js';
	import { continueWatching } from '$lib/stores.js';
	import type { continueWatch } from '$lib/types/continueWatching';
	import { Splide, SplideSlide, SplideTrack } from '@splidejs/svelte-splide';
	import { browser } from '$app/environment';
	import { checkSession } from '$lib/utils/checkForFirstVisit.js';
	import ContuineWatchingCard from '$lib/components/contuineWatchingCard.svelte';
	let gridData: Show[] = data.trending.slice(0, 20);
	let visible: boolean = true;
	$: gridData;
	const watching: Show[] = [];
	data.watchlist?.anime.map((anime) => {
		watching?.push(anime.show);
	});

	let latestEpisodes: continueWatch[] = [];
	$: latestEpisodes;
	let hasVisited: boolean = true;

	function visibleAlert() {
		// visible != visible;
		visible = false;
	}

	function setLatest() {
		if (!browser) return;
		const continueWatchList = get(continueWatching);

		const cutoffDate = Date.now() - 30 * 24 * 60 * 60 * 1000; // cutoff date is 30 days ago

		const filteredContinueWatchList = continueWatchList.filter(
			(cw) => cw.last_watched >= cutoffDate
		);

		const continueWatchBySimklId = filteredContinueWatchList.reduce((acc, cw) => {
			if (!acc[cw.simkl_id]) {
				acc[cw.simkl_id] = [];
			}
			acc[cw.simkl_id].push(cw);
			return acc;
		}, {} as Record<number, continueWatch[]>);

		latestEpisodes = Object.values(continueWatchBySimklId).map((animeWatchList) => {
			const latestWatch = animeWatchList.reduce((acc, cw) => {
				if (cw.last_watched > acc.last_watched) return cw;

				return acc;
			});
			return {
				simkl_id: latestWatch.simkl_id,
				anime_title: latestWatch.anime_title,
				episode_image: latestWatch.episode_image,
				episode_title: latestWatch.episode_title,
				episode: latestWatch.episode,
				progress: latestWatch.progress,
				last_watched: latestWatch.last_watched,
				provider: latestWatch.provider
			} as continueWatch;
		});
		latestEpisodes.sort((a, b) => b.last_watched - a.last_watched);
	}
	onMount(() => {
		setLatest();
		hasVisited = checkSession();
	});
</script>

<SvelteSeo
	title="Kato - Best free anime to watch in HD quality "
	description="Kato is the first free anime streaming website with Ai-Tools where you can watch English Subbed and Dubbed anime online. WATCH NOW! No Ads GUARANTEED!  "
	canonical="https://kato.to/home"
	keywords="katotv, katoto, kato, watch anime,anime online, free anime online, online anime, anime streaming, stream anime online, english anime, english dubbed anime, ai tools, anime pfp, ai-chat, ai-tools"
	openGraph={{
		title: 'Kato - Best free anime to watch in HD quality ',
		//@ts-ignore
		Image: 'https://www.kitsunee.me/icon.png',
		description:
			'Kato is the best free anime streaming website with Ai-Tools where you can watch English Subbed and Dubbed anime online. WATCH NOW! No Ads GUARANTEED! ',
		url: 'https://kato.to/home',
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

{#if !hasVisited && visible}
	<aside
		class="alert fixed z-100 h-32 w-2/4 left-[450px] bottom-1 variant-glass-error md:scale-[0.85] md:bottom-0 md:mb-[-10px]"
	>
		<!-- Icon -->
		<div>
			<svg
				class="hi-outline animate-bounce hi-exclamation-triangle inline-block w-12 h-12"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				aria-hidden="true"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
				/></svg
			>
		</div>
		<!-- Message -->
		<div class="alert-message">
			<h3 class="h3 font-extrabold">Welcome to Kato - Beta Alert</h3>
			<p>
				Kato is currently in beta, so please expect bugs and breaking changes. We appreciate your
				patience as we work to improve the site. Please feel free to send us your feedback. Thank
				you for your support and happy streaming! join our <a
					href="https://discord.gg/dzqKagm5FH"
					target="_blank"
					rel="noopener noreferrer">Discord</a
				>
			</p>
		</div>
		<!-- Actions -->
		<div class="alert-actions">
			<button type="button" on:click={visibleAlert} class="btn-icon variant-filled"
				><svg
					class="hi-outline hi-x-mark inline-block w-6 h-6"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					aria-hidden="true"
					><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg
				></button
			>
		</div>
	</aside>
{/if}
<div class="absolute inset-0">
	<Hero randomLogo={data.randomLogo} random={data.random} />
	<div
		class=" relative bottom-[152px] md:bottom-[220px] px-4 lg:px-10 container 3xl:max-w-10xl mx-auto text-white"
	>
		<Carousel data={data.trending} />
		<section class="container w-full space-y-6 py-14 text-themeText">
			{#if latestEpisodes?.length > 0}
				<div class="flex items-center justify-between">
					<div class="text-2xl border-l-4 pl-1 font-semibold text-white">Continue Watching</div>
					<!-- svelte-ignore a11y-invalid-attribute -->
					<a
						data-sveltekit-preload-data="hover"
						href="/profile?id=5"
						class="flex items-center space-x-1 text-sm font-light no-underline transition group text-secondary-100-800-token"
					>
						<span class="no-underline">See All</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							class="w-5 h-5 transition ease-out opacity-50 group-active:translate-x-2 group-hover:opacity-100"
						>
							<path
								fill-rule="evenodd"
								d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
								clip-rule="evenodd"
							/>
						</svg>
					</a>
				</div>

				<Splide
					aria-label="Continue Watching"
					hasTrack={false}
					options={{
						arrows: false,
						rewind: true,
						// @ts-ignore
						perPage: 'auto',
						// wheel: true,
						lazyLoad: 'sequential',
						gap: '1rem',
						focus: 0,
						pagination: false,
						snap: true,
						perMove: 1,
						breakpoints: {
							1536: {
								perPage: 4
							},
							1280: {
								perPage: 2
							},
							1024: {
								perPage: 2
							},
							768: {
								perPage: 2
							},
							640: {
								perPage: 1
							},
							0: {
								perPage: 1
							}
						}

						// arrowPath:
						// 	'M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v12zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1z'
					}}
				>
					<SplideTrack>
						{#each latestEpisodes as episode, i}
							<SplideSlide class="w-fit px-2  bg-transparent ">
								<ContuineWatchingCard {episode} />
							</SplideSlide>
						{/each}
					</SplideTrack>
				</Splide>
			{/if}

			<CollectionContainer data={collections} />
			<WideContainer data={data.hot_movies} />
			<div class="text-2xl border-l-4 pl-1 font-semibold text-white">Most Popular</div>

			<ul
				class="flex flex-wrap justify-start min-[1300px]:grid gap-5 pl-5 max-[700px]:pl-0 max-[700px]:grid lg:pl-0 wrapper mt-10"
			>
				{#each gridData as anime}
					{#if anime.ids != null}
						<div class="" in:fly={{ y: 250, duration: 500 }}>
							<ItemCard {anime} />
						</div>
					{/if}
				{/each}
			</ul>

			<button
				type="button"
				on:click={() => {
					gridData = gridData.concat(data.trending.slice(gridData.length, gridData.length + 10));
				}}
				class="btn-sm flex items-center text-center gap-1 md:btn lg:w-[91%] w-full lg:ml-[75px] font-medium variant-filled-surface bg-primary-hover-token scale-105 rounded-lg md:rounded-lg"
				>Show More</button
			>
		</section>
	</div>
</div>

<style>
	@keyframes -global-slide-in-elliptic-top-fwd {
		0% {
			transform: translateY(450px) rotateX(-30deg) scale(0.8);
			transform-origin: 50% 100%;
			opacity: 0;
		}
		100% {
			transform: translateY(0) rotateX(0) scale(1);
			transform-origin: 50% 1400px;
			opacity: 1;
		}
	}
	@keyframes -global-fade-in {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	.wrapper {
		width: 100%;
		grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
	}
</style>
