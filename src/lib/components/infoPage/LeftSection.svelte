<script lang="ts">
	//src\lib\anify\types\index.ts

	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import { changeVidSrc, changeVidSrcAnify, getArtRef } from './Utils/Player/player';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import type { Info } from '$lib/simkl/types';
	import { afterNavigate } from '$app/navigation';
	import type { EpisodeData } from '$lib/anify/types';
	import type { Episode } from '$lib/anify/types';
	import VirtualList from 'svelte-tiny-virtual-list';
	import { Select, Dropdown, DropdownItem, ChevronDown } from 'flowbite-svelte';
	import { browser } from '$app/environment';
	import setUrlParams from './Utils/Player/setUrlParams';
	import { continueWatching, settings } from '$lib/stores';
	import { getLargeFanart, getLargePoster } from '$lib/simkl/routes/utils/images';
	export let data: {
		info: Info;
		episodes: EpisodeData[];
	};
	let mHeight = 600;
	function getMheight() {
		if (!browser) return 0;
		const MiddleSection = document.getElementById('MiddleSection')!.clientHeight;
		const providerSubDub = document.getElementById('providerSubDub')!.clientHeight;
		const asideEpSearch = document.getElementById('asideEpSearch')!.clientHeight;

		return MiddleSection - (providerSubDub + asideEpSearch);
	}
	let artRef: Artplayer;
	let value: number = 0;

	let subDub = [
		{ value: 0, name: 'Sub' },
		{ value: 1, name: 'Dub' }
	];
	let selected: number = 0;
	let selectedSubOrDub: number = getDubParam() ? 1 : 0;
	let selectedEpisode: Episode[] | null = data.episodes[selected]?.episodes;
	let providersList = getEpisodeProviders();
	let currentEpisode: number;
	let scrollTo: number;
	$: setUrlParams(currentEpisode);
	$: {
		settings.set({ isDub: selectedSubOrDub == 1 });
		if (selectedSubOrDub) {
			console.log('dub');
			selectedEpisode = data.episodes[selected]?.episodes.filter((e) => e.hasDub == true);
		} else {
			console.log('sub');

			selectedEpisode = data.episodes[selected]?.episodes;
		}
	}

	function getDefaultOrProvider() {
		if (!browser) return;
		let provider = getProviderParam();
		if (!provider) {
			let stringList: string[] = [];
			for (const provider of providersList) {
				stringList.push(provider.name);
			}
			const priority = getStringByPriority(stringList);
			if (priority) {
				provider = priority;
			} else {
				return 0;
			}
		}
		const index = providersList.findIndex((p) => p.name === provider);
		if (index === -1) return;
		selected = index;
	}
	function getStringByPriority(stringList: string[]): string | null {
		const priorityOrder: string[] = ['zoro', 'gogoanime', '9anime', 'gogoanime (dub)', 'animepahe'];
		for (const priority of priorityOrder) {
			if (stringList.includes(priority)) {
				return priority;
			}
		}
		return null;
	}
	function getDubParam() {
		if (!browser) return;
		const setting = get(settings);
		return setting.isDub;
	}
	function getProviderParam() {
		if (!browser) return;
		const newUrl = new URL(window.location.href);
		const provider = newUrl.searchParams.get('provider');
		return provider;
	}
	function getEpisodeProviders() {
		let providers: { value: number; name: string }[] = [];
		data.episodes.forEach((episode, i) => {
			let provider = episode.providerId;
			data.episodes[i].episodes.sort((a, b) => a.number - b.number);
			if (episode.providerId == 'gogoanime') {
				if (episode.episodes[0].hasDub == true) {
					provider = 'gogoanime (dub)';
				}
			}
			providers.push({ value: i, name: provider });
		});
		return providers;
	}
	function episodeClicked(index: number) {
		const selectedEpisode = data.episodes[selected]?.episodes[index];
		if (!selectedEpisode) return;
		const provider = providersList[selected].name.replace(' (dub)', '');
		currentEpisode = index;
		changeVidSrcAnify(
			provider,
			data.info.ids.anilist,
			selectedEpisode.id,
			selectedSubOrDub ? 'dub' : 'sub',
			index
		);
	}
	getDefaultOrProvider();

	onMount(() => {
		window.addEventListener('resize', () => {
			mHeight = getMheight();
			console.log(mHeight);
		});
		mHeight = getMheight();
		setInterval(function () {
			if (artRef) {
				if (!artRef.playing) return;
				if (!selectedEpisode) return;
				const continueWatch = get(continueWatching);
				const image =
					'https://wsrv.nl/?url=' +
					(selectedEpisode[currentEpisode].img
						? selectedEpisode[currentEpisode].img
						: data.info.fanart
						? getLargeFanart(data.info.fanart)
						: getLargePoster(data.info.poster)) +
					'&w=150&h=106&output=webp';
				const info = {
					simkl_id: data.info.ids.simkl,
					anime_title: data.info.title,
					episode_image: image,
					episode_title: selectedEpisode[currentEpisode].title,
					episode: selectedEpisode[currentEpisode].number,
					progress: artRef.currentTime / artRef.duration,
					type: data.info.type,
					last_watched: Date.now(),
					provider: encodeURIComponent(providersList[selected].name)
				};
				console.log(info.episode);
				const oldInfo = continueWatch
					.filter((x) => x.simkl_id == info.simkl_id)
					.filter((x) => x.episode == info.episode);

				console.log(oldInfo);

				if (oldInfo.length > 0) {
					console.log(oldInfo[0].episode);

					const index = continueWatch.indexOf(oldInfo[0]);
					continueWatch[index].progress = artRef.currentTime / artRef.duration;
					continueWatch[index].last_watched = Date.now();
					continueWatch[index].episode_image = image;
					console.log(encodeURIComponent(providersList[selected].name));
					console.log(continueWatch[index].provider);
					continueWatch[index].provider = encodeURIComponent(providersList[selected].name);
				} else {
					continueWatch.push(info);
				}
				continueWatching.set(continueWatch);
			}
		}, 5000);
	});
	afterNavigate(() => {
		artRef = getArtRef();

		currentEpisode = getUrlEpisode();
		episodeClicked(currentEpisode);
	});

	function getUrlEpisode(): number {
		const newUrl = new URL(window.location.href);
		let number = Number(newUrl.searchParams.get('ep'));
		if (number) return number;
		return 0;
	}
</script>

<main class="w-full h-full mt-1 rounded-lg lg:rounded-none lg:mt-0 variant-filled-surface">
	<aside id="asideEpSearch" class="flex gap-10 py-3 border-b border-secondary-600/70 p-1">
		<div
			class="input-group border focus:ring-error-500 focus:border-error-500 active:border-error-500 rounded-md border-error-500 input-group-divider grid-cols-[auto_1fr_auto]"
		>
			<!-- <div class="input-group-shim variant-soft-secondary rounded-l-md">
        <svg
          class="hi-mini hi-magnifying-glass inline-block w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          ><path
            fill-rule="evenodd"
            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
            clip-rule="evenodd"
          /></svg
        >
      </div> -->

			<input
				type="search"
				class="variant-soft-secondary w-full rounded-r-md"
				placeholder="Ep Number"
				on:change={(e) => {
					//@ts-ignore
					const episodeNumber = Number(e.target.value);
					if (!isNaN(episodeNumber)) {
						scrollTo = episodeNumber - 1;
						console.log(scrollTo);
					}
				}}
			/>
		</div>

		<RadioGroup padding="px-2 py-1" background="variant-glass-secondary" rounded="rounded-md">
			<RadioItem bind:group={value} name="justify" value={1}
				><svg
					class="hi-mini hi-queue-list inline-block w-5 h-5"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
					><path
						d="M2 4.5A2.5 2.5 0 014.5 2h11a2.5 2.5 0 010 5h-11A2.5 2.5 0 012 4.5zM2.75 9.083a.75.75 0 000 1.5h14.5a.75.75 0 000-1.5H2.75zM2.75 12.663a.75.75 0 000 1.5h14.5a.75.75 0 000-1.5H2.75zM2.75 16.25a.75.75 0 000 1.5h14.5a.75.75 0 100-1.5H2.75z"
					/></svg
				></RadioItem
			>
			<RadioItem bind:group={value} name="justify" value={0}
				><svg
					class="hi-mini hi-bars-3 inline-block w-5 h-5"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
					><path
						fill-rule="evenodd"
						d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"
						clip-rule="evenodd"
					/></svg
				></RadioItem
			>
		</RadioGroup>
	</aside>
	<div id="providerSubDub" class="flex">
		<Select id="countries" items={providersList} class="m-2" bind:value={selected} placeholder="" />
		<Select id="subDub" items={subDub} class="m-2" bind:value={selectedSubOrDub} placeholder="" />
	</div>
	{#if value === 1}
		<section class="px-1 w-full mt-1 flex justify-center">
			<ul class="w-full h-64 lg:h-[540px] 2xl:h-[680px] overflow-y-auto border border-slate-800">
				{#if selectedEpisode}
					<VirtualList
						scrollToIndex={scrollTo}
						scrollToBehaviour="smooth"
						width="100%"
						height={mHeight}
						itemCount={selectedEpisode.length}
						itemSize={65}
					>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<div slot="item" on:click={() => episodeClicked(index)} let:index let:style {style}>
							<li
								class={`h-full !p-0 hover:variant-soft-primary hover:cursor-pointer !m-0 ${
									index % 2 === 0 ? 'variant-soft-surface ' : 'bg-surface-600 '
								} border-opacity-30   border-b-[0.2px] border-slate-700 flex items-center font-light text-secondary-200`}
							>
								<span class="mx-4">{selectedEpisode[index].number}</span><span
									class=" text-opacity-0">{selectedEpisode[index].title}</span
								>
							</li>
						</div>
					</VirtualList>
				{/if}
			</ul>
		</section>
	{:else}
		<section id="vlistParent" class="px-1 w-full text- mt-1 flex justify-center">
			<ul class="w-full h-[{mHeight}px] overflow-y-auto border border-slate-800">
				{#if selectedEpisode}
					<VirtualList
						scrollToIndex={scrollTo}
						width="100%"
						height={mHeight}
						itemCount={selectedEpisode.length}
						itemSize={100}
					>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<div slot="item" on:click={() => episodeClicked(index)} let:index let:style {style}>
							<li
								class={`h-24 !p-0 !m-0 bg-surface-600 border-opacity-30 hover:variant-soft-primary hover:cursor-pointer  border-b-[0.2px] border-slate-700 flex items-center font-light text-secondary-200`}
							>
								<div class="flex items-center gap-4 font-normal text-sm text-slate-300">
									<div class="relative">
										<img
											class="object-fill aspect-video h-20 min-w-[125px] lg:min-w-[100px] 2xl:min-w-[140px] relative opacity-90"
											src={'https://wsrv.nl/?url=' +
												(selectedEpisode[index].img
													? selectedEpisode[index].img
													: data.info.fanart
													? getLargeFanart(data.info.fanart)
													: getLargePoster(data.info.poster)) +
												'&w=150&h=106&output=webp'}
											alt=""
											srcset=""
										/>
										<span
											class="absolute bg-secondary-backdrop-token font-medium py-[2px] px-1 bottom-1 right-1 rounded-[8px]"
											>24m</span
										>
									</div>
									<div
										class="flex flex-col gap-1 opacity-90 justify-start leading-4 tracking-normal"
									>
										<span class="line-clamp-2 text-gray-50">{selectedEpisode[index].title}</span>
										<span class="text-[.8rem] mb-3">Episode {selectedEpisode[index].number}</span>
										{#if selectedEpisode[index].isFiller}
											<span class="font-bold">FILLER</span>
										{/if}
									</div>
								</div>
							</li>
						</div>
					</VirtualList>
				{/if}
			</ul>
		</section>
	{/if}
</main>
