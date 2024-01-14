<script lang="ts">
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css/sea-green';
	// import { popup } from '@skeletonlabs/skeleton';
	export let title = 'Currently Trending';
	// import type { PopupSettings } from '@skeletonlabs/skeleton';
	import type { Show } from '$lib/simkl/types';
	export let data: Show[];
	$: data;

	import ItemCard from './ItemCard.svelte';

	let activeAnime: Show;
	let isHovering = false;
	$: isHovering;
	$: activeAnime;

	// let popupSettings: PopupSettings = {
	// 	// Set the event as: click | hover | hover-click | focus | focus-click
	// 	event: 'hover-click',

	// 	// Set the delay in ms before the popup is shown.
	// 	// Provide a matching 'data-popup' value.
	// 	placement: 'top-start',
	// 	target: ''
	// };
</script>

<!-- <div class="md:pl-[120px] pl-1 space-y-2 py-4 text-2xl font-sans font-bold justify-self-start">
	Special For You
</div> -->
<!-- {#each data as anime (anime.ids.simkl_id)}
	<CardPopup {activeAnime} target={anime.ids.simkl_id.toString()} />
{/each} -->

<div class="flex gap-2 flex-col rounded-xl mt-7">
	<div class="text-2xl border-l-4 pl-2 ml-1 !text-white font-semibold ">{title}</div>

	<Splide
		class="w-full overflow-hidden rounded-xl "
		aria-label="My Favorite Images"
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
			perMove: 1

			// arrowPath: 'M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v12zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1z',
		}}
	>
		<!-- use:popup={{ ...popupSettings, target: anime.ids.simkl_id.toString() }}
					on:mouseenter={() => {
						activeAnime = anime;
					}} -->
		{#each data.slice(0, 10) as anime (anime.ids?.simkl_id ?? anime.ids?.simkl)}
			<SplideSlide data-sveltekit-preload-data="hover">
				<a class="" href="/anime/{anime.ids?.simkl_id ?? anime.ids?.simkl}">
					<ItemCard {anime} />
				</a>
			</SplideSlide>
		{/each}
	</Splide>
</div>

<style>
	/* a:hover {
		all: unset;
	} */
</style>
