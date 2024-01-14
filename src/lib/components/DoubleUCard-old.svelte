<script lang="ts">
	import CharacterCard from '$lib/components/CharacterCard.svelte';
	import { getLargePoster } from '$lib/simkl/routes/utils/images';
	import type { Show } from '$lib/simkl/types';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	export let anime: Show;
	let final = true;
	let value = anime?.ratings?.mal?.rating
		? anime.ratings.mal.rating * 10
		: anime?.ratings?.simkl?.rating ?? 6.4 * 10;
	let color = 'black';
	const rating = Math.floor(value);
	if (rating < 60) {
		color = 'stroke-error-500';
	} else if (rating >= 60 && rating < 75) {
		color = 'stroke-warning-500';
	} else if (rating >= 75 && rating <= 100) {
		color = 'stroke-success-500';
	} else {
		color = 'stroke-error-500';
	}
</script>

<div class="w-full h-full max-w-[150px] max-h-[300px]">
	<div class="card relative w-full h-full">
		<img
			class="image rounded-t-xl aspect-[3/4]"
			loading="lazy"
			src={'//wsrv.nl/?url=' + getLargePoster(anime.poster) + '&w=460&h=650&output=webp'}
			alt=""
		/>
		<div class="content">
			<div class="title line-clamp-1">{anime.title}</div>
			<p class="genre line-clamp-1 text-secondary-400">
				{anime?.genres ? anime?.genres[0] : 'N/A'}
			</p>

			<div class="absolute flex items-center gap-1 p-1 py-2 right-0 bottom-0">
				<svg
					class="hi-mini fill-secondary-400 hi-eye inline-block w-5 h-5"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
					><path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" /><path
						fill-rule="evenodd"
						d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
						clip-rule="evenodd"
					/></svg
				><span class="text-secondary-400">{anime.watched}+</span>
			</div>
			<div class="mugi" />
			<div />
		</div>
		<div class="absolute -left-5 -top-5">
			<ProgressRadial
				width="w-10 bg-black/60 rounded-full"
				stroke={85}
				font={146}
				meter={color}
				track="stroke-secondary-500/50"
				{value}>{value}%</ProgressRadial
			>
		</div>
	</div>
</div>

<style>
	.card {
		display: flex;
		flex-direction: column;
		transition: filter 0.3s ease-in-out;
		background-color: #141418;
		border-radius: 10px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
		color: #fff;
		position: relative;
		/* width: 180px; */
		/* height: 270px; */
	}

	.card:hover {
		filter: brightness(1.1);
	}

	.card .image {
		transition: all 0.3s ease-in-out;
		height: 100%;
		object-fit: cover;
		width: 100%;
		position: relative;
	}

	.card .content {
		border-radius: 10px;
		background: #141418;
		padding: 10px;
		position: relative;
		display: flex;
		flex-direction: column;
		height: auto;
		overflow: hidden;
	}
	.card .content .mugi {
		transition: top 0.2s ease-in-out;
	}
	.card .title {
		font-size: 17px;
		margin: 0;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.card .genre {
		font-size: 13px;
		margin: 0;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.card .content .mugi::before {
		background-color: rgba(255, 255, 255, 0.1);
		content: '';
		height: 120%;
		left: 0;
		position: absolute;
		transform: skewX(-15deg);
		transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
		width: 100%;
		border: none;
		top: 100%;
	}

	.card:hover .mugi::before {
		transition-duration: 0.5s;
		transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
		top: 0;
	}
</style>
