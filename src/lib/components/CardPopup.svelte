<script lang="ts">
	import type { Show } from '$lib/simkl/types';
	export let activeAnime: Show;
	$: activeAnime;
	export let target: string;
	$: target;
</script>

<div
	data-popup={target}
	class="p-4 border shadow-xl card w-80 rounded-xl z-100 variant-glass-surface hover:variant-glass-error border-surface-400"
>
	<!-- <div class="p-2 px-0 text-base font-semibold md:px-4">Title: {activeAnime?.title}</div>
	<p class="px-0 text-base md:px-4 line-clamp-3">Summary: {activeAnime?.overview}</p>
	<p>Release Date: {activeAnime?.release_date}</p> -->
	<header class="flex flex-col gap-2 card-header">
		<div class="text-base font-semibold line-clamp-2">{activeAnime?.title}</div>
		<div class="flex items-center justify-between gap-1 text-sm font-semibold">
			<div class="flex gap-1">
				<div class="flex items-center gap-1">
					<svg
						class="inline-block w-4 h-4 hi-mini hi-star fill-yellow-400"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill=""
						aria-hidden="true"
						><path
							fill-rule="evenodd"
							d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
							clip-rule="evenodd"
						/></svg
					>

					<span class="pr-1">{activeAnime?.ratings?.mal?.rating ?? 'N/A'}</span>
				</div>
				<div class="flex gap-[2px]">
					<div
						class="flex items-center px-1 text-xs font-bold leading-3 rounded-l bg-warning-400 text-secondary-500"
					>
						<span>HD</span>
					</div>
					<div
						class="font-bold flex items-center gap-[2px] px-1 py-[1px] leading-3 text-xs rounded-r bg-success-600"
					>
						<svg
							class="inline-block w-4 h-4 bi bi-badge-cc-fill fill-secondary-500"
							xmlns="http://www.w3.org/2000/svg"
							fill=""
							viewBox="0 0 16 16"
							aria-hidden="true"
							><path
								d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm3.027 4.002c-.83 0-1.319.642-1.319 1.753v.743c0 1.107.48 1.727 1.319 1.727.69 0 1.138-.435 1.186-1.05H7.36v.114c-.057 1.147-1.028 1.938-2.342 1.938-1.613 0-2.518-1.028-2.518-2.729v-.747C2.5 6.051 3.414 5 5.018 5c1.318 0 2.29.813 2.342 2v.11H6.213c-.048-.638-.505-1.108-1.186-1.108zm6.14 0c-.831 0-1.319.642-1.319 1.753v.743c0 1.107.48 1.727 1.318 1.727.69 0 1.139-.435 1.187-1.05H13.5v.114c-.057 1.147-1.028 1.938-2.342 1.938-1.613 0-2.518-1.028-2.518-2.729v-.747c0-1.7.914-2.751 2.518-2.751 1.318 0 2.29.813 2.342 2v.11h-1.147c-.048-.638-.505-1.108-1.187-1.108z"
							/></svg
						>
						<span class="font-bold text-secondary-500">{activeAnime?.total_episodes ?? 'N/A'}</span>
					</div>
				</div>
			</div>
			<span
				class="font-semibold flex items-center gap-[1px] px-1 py-1 leading-3 text-xs rounded variant-filled-tertiary"
				>{activeAnime?.anime_type?.toUpperCase() ?? 'N/A'}</span
			>
		</div>
	</header>
	<section class="p-4 text-xs font-light line-clamp-3 text-secondary-200">
		{activeAnime?.overview?.replace(/(<([^>]+)>|\*)/gi, '')}
	</section>
	<footer class="flex flex-col mt-2 card-footer">
		<span class="text-sm font-light text-secondary-200"
			><span class="font-normal text-secondary-50">Aired:</span> {activeAnime?.release_date}</span
		>
		<span class="text-sm font-light text-secondary-200"
			><span class="font-normal text-secondary-50">Status:</span> {activeAnime?.status}</span
		>
		<span class="flex gap-1 text-sm font-light text-secondary-200"
			><span class="font-normal text-secondary-50">Genres:</span>
			{activeAnime?.genres?.slice(0, 3)}</span
		>
		<a
			href="/anime/{activeAnime?.ids?.simkl_id}"
			class="flex items-center mt-2 rounded-full btn variant-ghost-tertiary bg-tertiary-hover-token"
		>
			<span
				><svg
					class="w-5 h-5 hi-mini hi-play"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
					><path
						d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"
					/></svg
				></span
			>
			<span>Watch Now</span>
		</a>
	</footer>
</div>
