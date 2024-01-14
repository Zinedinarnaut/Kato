<script lang="ts">
	import type { cResult } from '$lib/consumet/routes/AdvancedSearch/types/cResponse';
	import { getLargePoster } from '$lib/simkl/routes/utils/images';
	import type { Show } from '$lib/simkl/types';
	import { writable, type Writable } from 'svelte/store';
	import { useLazyImage as lazyImage } from 'svelte-lazy-image';
	export let anime: Show | cResult;

	function iscResult(anime: Show | cResult): anime is cResult {
		return (anime as cResult).id !== undefined;
	}

	$: bgImage = `//wsrv.nl/?url=${getLargePoster(
		iscResult(anime) ? '//wsrv.nl/' + anime.image : anime.poster
	)}&w=150&h=230&output=web`;

	$: release_date = iscResult(anime)
		? anime.releaseDate
		: anime.release_date
		? new Date(anime.release_date).getFullYear()
		: 'N/A';

	$: rating = iscResult(anime)
		? (anime.rating / 10).toFixed(1)
		: anime.ratings?.simkl?.rating?.toFixed(1);

	$: href = iscResult(anime)
		? 'watch/slug?id=search&malId=' + anime.malId
		: `watch/${anime.ids?.slug ?? anime.title.replaceAll(' ', '-')}?id=` +
		  (anime.ids?.simkl_id ?? anime.ids?.simkl ?? '');

	const hover: Writable<boolean> = writable();
	$: hover.set(false);
</script>

<div
	class="w-[150px] h-[230px] bg-cover bg-no-repeat rounded-[8px] text-sm relative overflow-hidden transition-all"
	on:mouseenter={() => hover.set(true)}
	on:mouseleave={() => hover.set(false)}
>
	<a {href}>
		<!-- TODO: Needs placeholder image -->

		<img
			class="backgroundImage absolute top-0 left-0 w-full h-full object-cover"
			data-src={bgImage}
			alt={typeof anime.title === 'object'
				? anime.title.english ?? anime.title.romaji ?? anime.title.native ?? 'N/A'
				: anime.title}
			use:lazyImage
		/>
		<slot />
		<div class="fade" />
		<div
			class={'metaInfo flex transition-all flex-col justify-end w-full h-full p-2 relative z-1 gap-[-1px] ' +
				($hover ? 'opacity-0' : 'opacity-100')}
		>
			<p class="title line-clamp-1 text-white">
				<slot name="title">
					{#if typeof anime.title === 'object'}
						{@html anime.title.english ?? anime.title.romaji ?? anime.title.native ?? 'N/A'}
					{:else}
						{@html anime.title}
					{/if}
				</slot>
			</p>
			<div class="underTitle flex flex-row flex-nowrap text-[.8rem] text-secondary-300">
				<slot name="UnderTitle1">{release_date},</slot>
				<slot name="UnderTitle2">{anime.genres?.length ? anime.genres[0] : 'N/A'}</slot>
			</div>
		</div>
		<div
			class={'hover flex flex-row justify-center items-center absolute top-0 left-0 ' +
				($hover ? 'opacity-100' : 'opacity-0')}
		>
			<div
				class="variant-filled-surface px-5 py-[.5rem] rounded-br-[10px] flex flex-row flex-none gap-[8px]"
			>
				<svg
					class="hi-mini hi-star inline-block w-[1.2rem] h-[1.2rem]"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
					><path
						fill-rule="evenodd"
						d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
						clip-rule="evenodd"
					/></svg
				>
				<p class="font-semibold text-[.9rem]">{rating}</p>
			</div>
		</div>
	</a>
</div>

<style>
	.fade {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 50%;
		z-index: 0;
		opacity: 0.6;
		background: linear-gradient(to top, #000 20%, transparent);
	}
</style>
