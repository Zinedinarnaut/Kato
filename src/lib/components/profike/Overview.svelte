<script lang="ts">
	import '@splidejs/svelte-splide/css/sea-green';

	import type { authed } from '$lib/types';
	import type { Stats, WatchList } from '$lib/simkl/types';
	export let data: {
		authed: authed;
		pathname: string;
		planToWatch: WatchList | null | undefined;
		finished: WatchList | null | undefined;
		List: WatchList | null | undefined;
		OnHOld: WatchList | null | undefined;
		Dropped: WatchList | null | undefined;
		stats: Stats | null | undefined;
	};
	import { Paginator } from '@skeletonlabs/skeleton';
	import { get } from 'svelte/store';
	import { continueWatching } from '$lib/stores';
	import ContuineWatchingCard from '../contuineWatchingCard.svelte';

	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	const source = get(continueWatching);
	let page = {
		offset: 0,
		limit: 5,
		size: source.length,
		amounts: []
	};
	$: paginatedSource = source.slice(
		page.offset * page.limit, // start
		page.offset * page.limit + page.limit // end
	);
</script>

<div class=" mx">
	<div class="container xl:max-w-7xl mx-auto px-4 py-8 lg:px-8">
		<!-- Stats -->
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
			<a
				href="javascript:void(0)"
				class="group relative p-4 lg:p-6 variant-soft-surface border border-rose-200 rounded-xl transition duration-150 lg:-top-5"
			>
				<div
					class="absolute inset-0 bg-error-500/70 rounded-xl blur-md transition duration-100 opacity-0 scale-100 group-hover:opacity-100 group-hover:scale-105 group-active:opacity-0"
				/>
				<div
					class="absolute inset-0 bg-error-500/70 border border-rose-300 rounded-xl transition duration-100 scale-100 opacity-0 group-hover:opacity-100 group-hover:scale-105 group-active:scale-100 group-active:opacity-0"
				/>
				<div class="relative text-center">
					<div class="text-xs uppercase text-error-500 font-semibold tracking-wider mb-4">
						Total Minutes
					</div>
					<div class="relative w-12 mb-8 text-rose-500 mx-auto">
						<svg
							class="hi-solid hi-server inline-block opacity-50 w-10 h-10 absolute right-0 bottom-0 transition translate-x-2 translate-y-2 text-rose-200 group-hover:translate-x-0 group-hover:translate-y-0"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
							/></svg
						>
						<svg
							class="hi-outline hi-server inline-block w-12 h-12 relative transition group-hover:translate-x-1 group-hover:translate-y-1"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
							/></svg
						>
					</div>
					<h4 class="text-xl lg:text-2xl font-extrabold text-rose-900">
						{data.stats?.total_mins}+
					</h4>
				</div>
			</a>
			<a
				href="javascript:void(0)"
				class="group relative p-4 lg:p-6 variant-soft-surface border border-emerald-200 rounded-xl transition duration-150 lg:top-5"
			>
				<div
					class="absolute inset-0 bg-success-50/70 rounded-xl blur-md transition duration-100 opacity-0 scale-100 group-hover:opacity-100 group-hover:scale-105 group-active:opacity-0"
				/>
				<div
					class="absolute inset-0 bg-success-50/70 border border-emerald-200 rounded-xl transition duration-100 scale-100 opacity-0 group-hover:opacity-100 group-hover:scale-105 group-active:scale-100 group-active:opacity-0"
				/>
				<div class="relative text-center">
					<div class="text-xs uppercase text-emerald-500 font-semibold tracking-wider mb-4">
						Watched Episodes
					</div>
					<div class="relative w-12 mb-8 text-emerald-500 mx-auto">
						<svg
							class="hi-solid hi-desktop-computer opacity-50 inline-block w-10 h-10 absolute right-0 bottom-0 transition translate-x-2 translate-y-2 text-emerald-200 group-hover:translate-x-0 group-hover:translate-y-0"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
							><path
								fill-rule="evenodd"
								d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z"
								clip-rule="evenodd"
							/></svg
						>
						<svg
							class="hi-outline hi-desktop-computer inline-block w-12 h-12 relative transition group-hover:translate-x-1 group-hover:translate-y-1"
							stroke="currentColor"
							fill="none"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
							/></svg
						>
					</div>
					<h4 class="text-xl lg:text-2xl font-extrabold text-emerald-900">
						{data.stats?.anime.completed.watched_episodes_count}+
					</h4>
				</div>
			</a>
			<a
				href="javascript:void(0)"
				class="group relative p-4 lg:p-6 variant-soft-surface border border-orange-200 rounded-xl transition duration-150 lg:-top-5"
			>
				<div
					class="absolute inset-0 bg-orange-100/70 rounded-xl blur-md transition duration-100 opacity-0 scale-100 group-hover:opacity-100 group-hover:scale-105 group-active:opacity-0"
				/>
				<div
					class="absolute inset-0 bg-orange-50/70 border border-orange-300 rounded-xl transition duration-100 scale-100 opacity-0 group-hover:opacity-100 group-hover:scale-105 group-active:scale-100 group-active:opacity-0"
				/>
				<div class="relative text-center">
					<div class="text-xs uppercase text-orange-500 font-semibold tracking-wider mb-4">
						Watched Last Week
					</div>
					<div class="relative w-12 mb-8 text-orange-500 mx-auto">
						<svg
							class="hi-solid hi-office-building opacity-50 inline-block w-10 h-10 absolute right-0 bottom-0 transition translate-x-2 translate-y-2 text-orange-200 group-hover:translate-x-0 group-hover:translate-y-0"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
							/></svg
						>
						<svg
							class="hi-outline hi-office-building inline-block w-12 h-12 relative transition group-hover:translate-x-1 group-hover:translate-y-1"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
							/></svg
						>
					</div>
					<h4 class="text-xl lg:text-2xl font-extrabold text-orange-900">
						{data.stats?.watched_last_week.anime_mins}+
					</h4>
				</div>
			</a>
			<a
				href="javascript:void(0)"
				class="group relative p-4 lg:p-6 variant-soft-surface border border-sky-200 rounded-xl transition duration-150 lg:top-5"
			>
				<div
					class="absolute inset-0 bg-sky-100/70 rounded-xl blur-md transition duration-100 opacity-0 scale-100 group-hover:opacity-100 group-hover:scale-105 group-active:opacity-0"
				/>
				<div
					class="absolute inset-0 bg-sky-50/70 border border-sky-300 rounded-xl transition duration-100 scale-100 opacity-0 group-hover:opacity-100 group-hover:scale-105 group-active:scale-100 group-active:opacity-0"
				/>
				<div class="relative text-center">
					<div class="text-xs uppercase text-sky-500 font-semibold tracking-wider mb-4">
						Total Dropped
					</div>
					<div class="relative w-12 mb-8 text-sky-500 mx-auto">
						<svg
							class="hi-solid hi-users inline-block w-10 h-10 absolute right-0 bottom-0 transition translate-x-2 translate-y-2 text-sky-200 group-hover:translate-x-0 group-hover:translate-y-0"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
							/></svg
						>
						<svg
							class="hi-outline hi-users inline-block w-12 h-12 relative transition group-hover:translate-x-1 group-hover:translate-y-1"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
							/></svg
						>
					</div>
					<h4 class="text-xl lg:text-2xl font-extrabold text-sky-900">
						{data.Dropped?.anime.length}+
					</h4>
				</div>
			</a>
		</div>
		<!-- END Stats -->
	</div>
</div>

<!-- Pagination: In Card -->
{#if source?.length > 0}
	<div class="flex flex-col rounded-lg shadow-sm bg-white overflow-hidden variant-ghost-surface">
		<!-- Card Header -->
		<div class="py-4 px-5">
			<h3 class="font-medium">Watched History</h3>
		</div>
		<!-- END Card Header -->

		<!-- Card Body -->

		<div class="flex flex-nowrap">
			<Splide
				aria-label="My Favorite Images"
				options={{
					arrows: false,
					rewind: true,
					wheel: false,
					width: '',
					lazyLoad: 'nearby',
					focus: 0,
					pagination: false,
					snap: true,
					perMove: 1,
					gap: '0.5rem',
					perPage: 5,
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
						}
					}
				}}
			>
				{#each paginatedSource as episode}
					<SplideSlide class="w-full bg-transparent aspect-video">
						<ContuineWatchingCard {episode} />
					</SplideSlide>
				{/each}
			</Splide>
		</div>
		<!-- END Card Body -->

		<!-- Card Footer -->
		<div class="py-4 px-5 grow border-t border-gray-200 dark:border-gray-700">
			<Paginator bind:settings={page} />
		</div>
		<!-- END Card Footer -->
	</div>
{/if}

<!-- END Pagination: In Card -->
<!-- END Stats Section: Card Links Contextual -->
<style>
	.wrapper {
		width: 100%;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		align-items: center;
		justify-items: flex-start;
	}
</style>
