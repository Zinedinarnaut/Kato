<script lang="ts">
	import '@splidejs/svelte-splide/css/sea-green';
	import { browser } from '$app/environment';
	import { afterNavigate } from '$app/navigation';
	import Consument from '$lib/consumet';
	import type { Episode } from '$lib/consumet/types';
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import Artplayer from 'artplayer';
	import artplayerPluginHlsQuality from 'artplayer-plugin-hls-quality';
	import { Input, Select } from 'flowbite-svelte';
	import { onDestroy, onMount } from 'svelte';
	import {
		changeVidSrc,
		createEpisodeSelections,
		findEpisodeSelectionsIndex,
		indexSearch,
		playM3u8,
		setEpBrowserParam
	} from './utils';
	import { continueWatching } from '$lib/stores';
	import { get } from 'svelte/store';
	import type { continueWatch } from '$lib/types/continueWatching';
	import type { Info } from '$lib/simkl/types';
	import type userSettings from '$lib/types/userSettings';
	import { settings } from '$lib/stores';

	export let currentEpisode: number;
	export let animeInfo: Info;
	let episodeSubOrDub = {
		sub: null,
		dub: null
	} as { sub: Episode[] | null; dub: Episode[] | null };
	let episodes: Episode[];
	let userSettings: userSettings;
	let splideRef: Splide;
	let artRef: Artplayer;
	let episodeSelectionsIndex = 0;
	let episodeSelections: { value: number; name: string; episodes: Episode[] }[] = [];

	$: episodeSelections = createEpisodeSelections(episodes);
	$: episodeSelectionsIndex;
	$: setEpBrowserParam(currentEpisode);

	async function initAndLoad() {
		console.log('initAndLoad');

		userSettings = get(settings);
		if (userSettings.isDub) {
			if (episodeSubOrDub.dub && episodeSubOrDub.dub.length > 0) {
				episodes = episodeSubOrDub.dub;
			} else {
				if (episodeSubOrDub.sub && episodeSubOrDub.sub.length > 0) {
					// toastStore.trigger({ message: 'Cannot curretly play dub, playing sub.' });
					console.log('Cannot curretly play dub, playing sub.');
					episodes = episodeSubOrDub.sub;
				}
			}
		} else {
			if (episodeSubOrDub.sub && episodeSubOrDub.sub.length > 0) {
				episodes = episodeSubOrDub.sub;
			} else {
				if (episodeSubOrDub.dub && episodeSubOrDub.dub.length > 0) {
					console.log('Cannot curretly play sub, playing dub.');
					// toastStore.trigger({ message: 'Cannot curretly play sub, playing dub.' });
					episodes = episodeSubOrDub.dub;
				}
			}
		}

		if (!episodes || !episodes[currentEpisode].id) return;
		const stream = await Consument.watch(episodes[currentEpisode].id, userSettings.isDub);
		let url = stream?.sources.find((x) => x.quality === 'auto' || x.quality === 'default')?.url;
		//filter sources by quality and get the heightest quality
		if (!url) {
			url =
				stream?.sources
					.filter((x) => x.quality !== 'auto' && x.quality !== 'default')
					.sort((a, b) => parseInt(b.quality) - parseInt(a.quality))[0]?.url ?? '';
		}

		if (artRef) {
			artRef.switchUrl('https://m3u8.streamsora.live/proxy/m3u8/' + encodeURIComponent(url));
			artRef.poster =
				'//wsrv.nl/?url=' +
				episodes[currentEpisode].image +
				'&w=1476&h=831&output=webp';
			return;
		}

		artRef = new Artplayer({
			container: '.kato-player',
			url: 'https://m3u8.streamsora.live/proxy/m3u8/' + encodeURIComponent(url),
			type: 'm3u8',
			pip: true,
			poster:
				'//wsrv.nl/?url=' +
				episodes[currentEpisode].image +
				'&w=1476&h=831&output=webp',

			setting: true,
			playbackRate: true,
			aspectRatio: true,
			fullscreen: true,
			plugins: [
				artplayerPluginHlsQuality({
					// Show quality in control
					control: false,

					// Show quality in setting
					setting: true,

					// Get the resolution text from level
					getResolution: (level) => level.height + 'P',

					// I18n
					title: 'Quality',
					auto: 'Auto'
				})
			],
			fullscreenWeb: true,
			subtitleOffset: true,
			miniProgressBar: true,
			mutex: true,
			backdrop: true,
			playsInline: true,
			autoPlayback: true,
			airplay: true,
			theme: '#9580FF',
			lang: navigator.language.toLowerCase(),
			moreVideoAttr: {
				crossOrigin: 'anonymous'
			},

			customType: {
				m3u8: playM3u8
			},
			settings: [
				{
					width: 200,
					html: 'Subtitle',
					tooltip: 'Bilingual',
					// icon: '<img width="22" heigth="22" src="/assets/img/subtitle.svg">',
					selector: [
						{
							html: 'Display',
							tooltip: 'Show',
							switch: true,
							onSwitch: function (item) {
								item.tooltip = item.switch ? 'Hide' : 'Show';
								artRef.subtitle.show = !item.switch;
								return !item.switch;
							}
						}
					],
					onSelect: function (item) {
						artRef.subtitle.switch(item.url, {
							name: item.html
						});
						return item.html;
					}
				}
			],
			highlight: [
				{
					time: 15,
					text: 'OP Start'
				},
				{
					time: 150,
					text: 'OP End'
				}
			],

			icons: {
				loading: `<img src="/player/loading.svg">`,
				indicator: '<img width="20" heigth="20" src="/player/indicator.svg">',
				state: '<img width="60" heigth="60" src="/player/state.svg">'
			}
		});
	}

	async function loadSubAndDub() {
		console.log('loadSubAndDub');
		let sub = animeInfo.ids?.anilist
			? Consument.getAnilistEpisodes(animeInfo.ids.anilist, false)
			: animeInfo.ids?.mal
			? Consument.getMALEpisodes(animeInfo.ids.mal, false)
			: null;

		let dub = animeInfo.ids?.anilist
			? Consument.getAnilistEpisodes(animeInfo.ids.anilist, true)
			: animeInfo.ids?.mal
			? Consument.getMALEpisodes(animeInfo.ids.mal, true)
			: null;

		const [subEpisodes, dubEpisodes] = await Promise.all([sub, dub]);
		episodeSubOrDub = {
			sub: subEpisodes,
			dub: dubEpisodes
		};
	}

	afterNavigate(async () => {
		if (!browser) return;
		console.log('afterNavigate');
		loadSubAndDub().then(() => {
			settings.subscribe((val) => {
				console.log('settings.subscribe');
				userSettings = val;
				episodeSelectionsIndex = 0;
				if (val.isDub == userSettings.isDub) initAndLoad();
			});
		});
	});
	//good dont remove
	onMount(async () => {
		setInterval(function () {
			if (artRef) {
				if (!artRef.playing) return;
				const continueWatch = get(continueWatching);

				const info: continueWatch = {
					simkl_id: animeInfo.ids.simkl,
					anime_title: animeInfo.title,
					episode_image: episodes[currentEpisode].image,
					episode_title: episodes[currentEpisode].title,
					episode: episodes[currentEpisode].number,
					progress: artRef.currentTime / artRef.duration,
					type: animeInfo.type,
					last_watched: Date.now()
				};
				const oldInfo = continueWatch.filter((x) => x.episode == info.episode);
				if (oldInfo.length > 0) {
					const index = continueWatch.indexOf(oldInfo[0]);
					continueWatch[index].progress = artRef.currentTime / artRef.duration;
					continueWatch[index].last_watched = Date.now();
				} else {
					continueWatch.push(info);
				}

				continueWatching.set(continueWatch);
			}
		}, 10000);
	});

	onDestroy(() => {
		if (artRef) artRef.destroy(true);
	});
	async function nextVideo() {
		let nextEpisode = currentEpisode + 1;
		if (nextEpisode > episodes.length - 1) {
			return;
		}
		currentEpisode = await changeVidSrc(nextEpisode, episodes, userSettings.isDub, artRef);
	}

	async function prevVideo() {
		let prevEpisode = currentEpisode - 1;
		if (prevEpisode < 0) return;
		currentEpisode = await changeVidSrc(prevEpisode, episodes, userSettings.isDub, artRef);
	}
</script>

{#if episodeSelections[episodeSelectionsIndex]?.episodes}
	<!-- TODO: style PROPERLY -->
	<div class="w-full" id="player">
		<div class="flex flex-col gap-2">
			<div class="text-2xl border-l-4 pl-1 font-semibold text-white">
				<svg
					class="hi-mini hi-tv inline-block w-10 h-10 mx-2"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
					><path d="M4 5h12v7H4V5z" /><path
						fill-rule="evenodd"
						d="M1 3.5A1.5 1.5 0 012.5 2h15A1.5 1.5 0 0119 3.5v10a1.5 1.5 0 01-1.5 1.5H12v1.5h3.25a.75.75 0 010 1.5H4.75a.75.75 0 010-1.5H8V15H2.5A1.5 1.5 0 011 13.5v-10zm16.5 0h-15v10h15v-10z"
						clip-rule="evenodd"
					/></svg
				>Watch
			</div>
			<div class="flex 2xl:flex-row flex-col">
				<div class="w-full aspect-video kato-player z-100" />
			</div>
		</div>
		<div
			class="md:px-10 mx px-5 w-fit mx-auto py-1 flex flex-col lg:flex-row text-sm md:text-base items-center justify-between gap-2 lg:gap-20 variant-filled-surface rounded-b-xl"
		>
			<div class="flex gap-4">
				<div>
					Auto Play <button class="text-success-500">ON</button>
				</div>
				<div>
					Auto Next <button class="text-success-500">ON</button>
				</div>
				<div>
					Auto Skip intro <button class="text-success-500">ON</button>
				</div>
			</div>
			<div class="div flex items-center gap-2">
				<button
					class="flex items-center gap-1"
					on:click={() => {
						prevVideo();
					}}
				>
					<svg
						class="hi-mini hi-backward inline-block w-5 h-5"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
						><path
							d="M7.712 4.819A1.5 1.5 0 0110 6.095v2.973c.104-.131.234-.248.389-.344l6.323-3.905A1.5 1.5 0 0119 6.095v7.81a1.5 1.5 0 01-2.288 1.277l-6.323-3.905a1.505 1.505 0 01-.389-.344v2.973a1.5 1.5 0 01-2.288 1.276l-6.323-3.905a1.5 1.5 0 010-2.553L7.712 4.82z"
						/></svg
					>
					<span>Prev</span>
				</button>
				<button
					class="flex items-center gap-1"
					on:click={() => {
						nextVideo();
					}}
				>
					<span>Next</span>
					<svg
						class="hi-mini hi-forward inline-block w-5 h-5"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
						><path
							d="M3.288 4.819A1.5 1.5 0 001 6.095v7.81a1.5 1.5 0 002.288 1.277l6.323-3.905c.155-.096.285-.213.389-.344v2.973a1.5 1.5 0 002.288 1.276l6.323-3.905a1.5 1.5 0 000-2.553L12.288 4.82A1.5 1.5 0 0010 6.095v2.973a1.506 1.506 0 00-.389-.344L3.288 4.82z"
						/></svg
					>
				</button>
				<button class="flex items-center">
					<svg
						class="hi-mini hi-plus inline-block w-5 h-5"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
						><path
							d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"
						/></svg
					> <button>Add to List</button>
				</button>
				<button class="flex items-center gap-1">
					<svg
						class="hi-mini hi-signal inline-block w-5 h-5"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
						><path
							d="M16.364 3.636a.75.75 0 00-1.06 1.06 7.5 7.5 0 010 10.607.75.75 0 001.06 1.061 9 9 0 000-12.728zM4.697 4.697a.75.75 0 00-1.061-1.06 9 9 0 000 12.727.75.75 0 101.06-1.06 7.5 7.5 0 010-10.607z"
						/><path
							d="M12.475 6.465a.75.75 0 011.06 0 5 5 0 010 7.07.75.75 0 11-1.06-1.06 3.5 3.5 0 000-4.95.75.75 0 010-1.06zM7.525 6.465a.75.75 0 010 1.06 3.5 3.5 0 000 4.95.75.75 0 01-1.06 1.06 5 5 0 010-7.07.75.75 0 011.06 0zM11 10a1 1 0 11-2 0 1 1 0 012 0z"
						/></svg
					><button>Watch2gether</button>
				</button>
			</div>
		</div>

		<div class="flex gap-5 my-4 w-full justify-between">
			{#if episodeSelections.length > 1}
				<div>
					<Select class="mt-2 my-2" items={episodeSelections} bind:value={episodeSelectionsIndex} />
				</div>
			{/if}

			<Input
				type="search"
				id="prepend_large"
				name="prepend_large"
				placeholder="Search Episode"
				defaultClass="w-[200px] mt-2 my-2"
				on:change={(e) => {
					//@ts-ignore

					const episodeNumber = Number(e.target.value);
					if (!isNaN(episodeNumber)) {
						episodeSelectionsIndex = findEpisodeSelectionsIndex(episodeNumber, episodeSelections);

						indexSearch(episodeNumber, episodeSelections, episodeSelectionsIndex, splideRef);
					}
				}}
			/>
		</div>
		<div class="w-full max-h-fit">
			<Splide
				bind:this={splideRef}
				class="w-full h-full rounded-xl"
				aria-label="My Favorite Images"
				options={{
					arrows: false,
					rewind: true,
					// @ts-ignore
					perPage: 'auto',
					wheel: true,
					lazyLoad: 'sequential',
					gap: '1rem',
					focus: 0,
					pagination: false,
					snap: true,
					perMove: 1
					// arrowPath:
					// 	'M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v12zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1z'
				}}
			>
				{#each episodeSelections[episodeSelectionsIndex].episodes as episode}
					<SplideSlide
						class="group h-36 transition-all delay-100 rounded-lg aspect-video overflow-hidden"
					>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<button
							class={`w-full h-full `}
							on:click={async () => {
								if (!artRef) return;

								currentEpisode = await changeVidSrc(
									episode.number - 1,
									episodes,
									userSettings.isDub,
									artRef
								);
							}}
						>
							<img
								class="w-full h-full object-cover transition-all delay-100 absolute group-hover:scale-110"
								src={'//wsrv.nl/?url=https://image-proxy-zeta.vercel.app/' +
									`${episode.image}` +
									'&w=256&h=144&output=webp'}
								alt=""
								loading="lazy"
							/>
							<div
								class={`flex flex-col-reverse h-full p-2 relative bg-gradient-to-t from-black/70 via-black/30 to-transparent ${
									episode.number - 1 === currentEpisode
										? 'ring-red-700 border-[2px]'
										: 'border-none'
								}`}
							>
								<p class=" line-clamp-2">{episode.title ?? 'Episode ' + episode.number}</p>
							</div>
							<div
								class={`absolute ml-2 top-[5px] -[10px] variant-filled-surface px-[1.5rem] py-[1rem] z-10 w-[1.5rem] h-[1rem] flex items-center justify-center rounded-[8px]`}
							>
								{episode.number}
							</div>
						</button>
					</SplideSlide>
				{/each}
			</Splide>
		</div>
	</div>
{/if}
