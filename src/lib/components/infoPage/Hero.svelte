<script lang="ts">
	import { onMount } from 'svelte';
	import Device from 'svelte-device-info';
	let mobile = false;
	import Rating from '$lib/components/infoPage/Rating.svelte';
	import Tabs from '$lib/components/Tabs.svelte';
	import { getLargePoster } from '$lib/simkl/routes/utils/images';
	onMount(() => {
		if (Device.isMobile) mobile = true;
	});
	import type { Info } from '$lib/simkl/types';
	import type { inList } from '$lib/simkl/routes/auth/user/checkItemList';
	import type { Characters } from '$lib/anilist/types';
	import type { authed } from '$lib/types';
	import removeTags from '$lib/utils/removeTags';
	import type { Episode } from '$lib/consumet/types';
	export let data: {
		authed: authed;
		pathname: string;
		info: Info;
		characters: Characters | null;
		isInList: inList | null;
		nextEpisodeDate: Date | undefined;
	};
</script>

<section class="w-full h-full py-3 lg:py-10">
	<div class="flex flex-col lg:flex-row gap-4 relative">
		{#if mobile}
			<!-- <Rating /> -->
		{/if}
		<img
			class="rounded-md mx-auto lg:mx-0 flex-grow-0 object-cover h-[300px] w-[200px]"
			src="https://wsrv.nl/?url={getLargePoster(data.info.poster)}&w=210&h=290&output=webp"
			alt=""
			width="210px"
			height="290px"
			srcset=""
		/>
		<div class="flex flex-col lg:w-7/12 px-2 gap-2">
			<div class="flex gap-1 flex-col">
				<h2 class="w-full font-medium lg:font-normal lg:!text-2xl text-center lg:text-left">
					{data.info.title}
				</h2>
				<div class="flex lg:hidden items-center gap-3 font-medium">
					<div class="flex gap-2 border-r pr-3 items-center">
						<img
							src="https://upload.wikimedia.org/wikipedia/commons/7/7a/MyAnimeList_Logo.png"
							class="h-5"
							alt=""
							srcset=""
						/>
						<span>{8.9}</span>
						<svg
							class="inline-block w-5 h-5 hi-outline hi-star fill-warning-400 stroke-surface-200"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke=""
							aria-hidden="true"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
							/></svg
						>
					</div>
					<span class="" />
					<div class="flex gap-3 items-center">
						<img src="https://eu.simkl.in/img_blog_2012/logo.png" class=" h-5" alt="" srcset="" />
						<span>{9.2}</span>
						<svg
							class="inline-block w-6 h-6 border-r pr-1 fill-warning-400 stroke-surface-200 hi-outline hi-star"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
							/></svg
						>
					</div>
					<div class="flex gap-3 pl-2 items-center">
						<img
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
							class="h-5"
							alt=""
							srcset=""
						/>
						<span>{9.0}</span>
						<svg
							class="inline-block w-5 h-5 fill-warning-400 stroke-surface-200 hi-outline hi-star"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
							/></svg
						>
					</div>
				</div>
				<div class="hidden lg:flex">
					<span class="flex gap-1"
						><svg
							class="bi bi-badge-hd-fill fill-slate-400 opacity-70 inline-block w-5 h-5"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 16 16"
							aria-hidden="true"
							><path
								d="M10.53 5.968h-.843v4.06h.843c1.117 0 1.622-.667 1.622-2.02 0-1.354-.51-2.04-1.622-2.04z"
							/><path
								d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm5.396 3.001V11H6.209V8.43H3.687V11H2.5V5.001h1.187v2.44h2.522V5h1.187zM8.5 11V5.001h2.188c1.824 0 2.685 1.09 2.685 2.984C13.373 9.893 12.5 11 10.69 11H8.5z"
							/></svg
						>
						<svg
							class="bi bi-badge-hd-fill inline-block w-5 h-5 fill-slate-400 opacity-70"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 16 16"
							aria-hidden="true"
							><path
								d="M10.53 5.968h-.843v4.06h.843c1.117 0 1.622-.667 1.622-2.02 0-1.354-.51-2.04-1.622-2.04z"
							/><path
								d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm5.396 3.001V11H6.209V8.43H3.687V11H2.5V5.001h1.187v2.44h2.522V5h1.187zM8.5 11V5.001h2.188c1.824 0 2.685 1.09 2.685 2.984C13.373 9.893 12.5 11 10.69 11H8.5z"
							/></svg
						></span
					>
				</div>
				<p
					class="line-clamp-4 text-sm text-slate-300 mt-1 lg:mt-0 opacity-80 full max-[500px]:w-full"
				>
					{removeTags(data.info.overview)}
				</p>
			</div>
			<div>
				<ul class="text-sm grid min-[500px]:flex lg:gap-5 items-center text-slate-400">
					<section>
						<li>Type: <span class="text-error-600">{data.info.anime_type.toUpperCase()}</span></li>
						<li>Country: <span class="text-error-600">{data.info.country}</span></li>
						<li>Premiered: <span class="text-error-600">{data.info.season_name_year}</span></li>
						<li>
							Date aired: <span class="text-error-600">{data.info.year}</span>
						</li>
						<li>Broadcast: <span class="text-error-600">{data.info.first_aired}</span></li>
						<li>Status: <span class="text-error-600">{data.info.status.toUpperCase()}</span></li>
					</section>
					<section>
						<li>
							Genres: <span class="text-error-600">{data.info.genres}</span>
						</li>

						<li>Episodes: {data.info.total_episodes}</li>
						<li>Studios: <span class="text-error-600">{data.info.studios[0].name}</span></li>
						<li>rating: <span class="text-error-600">{data.info.ratings.simkl.rating}</span></li>
						<li>
							Network: <span class="text-error-600">{data.info.network}</span>
						</li>
					</section>
				</ul>
			</div>
		</div>
		{#if !mobile}
			<Rating data={data.info.ratings.mal} />
		{/if}
		{#if mobile}
			<Tabs {data} justifyM={false} />
		{/if}
	</div>
	{#if !mobile}
		<Tabs {data} justifyM={true} />
	{/if}
</section>
