<script lang="ts">
	import type { continueWatch } from '$lib/types/continueWatching';

	export let episode: continueWatch;

	let provider = '';
	if (episode.provider) {
		provider = '&provider=' + episode.provider;
	}
	console.log(episode);
	console.log(provider);
	function replaceNonAlphanumeric(str: string): string {
		return str.replace(/\W+/g, '-');
	}
</script>

<div
	class="w-full aspect-video h-[200px] max-w-[350px] max-[1700px]:max-w-[400px] max-[1700px]:max-h-[250px] overflow-hidden rounded-[8px] relative group hover:ring-2 hover:ring-error-500 active:opacity-75 active:ring-error-500 transition-all"
>
	<a
		href="/watch/{replaceNonAlphanumeric(episode.anime_title)
			.split(' ')
			.join('-')}?id={episode.simkl_id}&ep={episode.episode - 1}{provider}"
		class="overflow-hidden rounded-xl"
	>
		<img
			class="object-cover overflow-hidden w-full h-full absolute top-0 left-0 z-0"
			src="//image-proxy-zeta.vercel.app/{episode.episode_image}"
			alt="{episode.anime_title} Episode {episode.episode}"
		/>
		<div
			class="relative z-1 flex w-full h-full flex-col justify-end p-6 bg-gradient-to-b from-transparent via-black/50 to-black"
		>
			<div class="flex flex-row justify-between mb-[5px]">
				<div class="mb-2">
					<h4 class="text-xl font-semibold text-white line-clamp-2 min-[1500px]:!text-[1em]">
						{episode.episode_title ?? episode.anime_title}
					</h4>
					<p class="text-sm font-semibold text-slate-500">
						Episode: {episode.episode}
					</p>
				</div>
				<div class="h-full flex flex-col justify-end pb-3">
					<div
						class="h-10 w-10 rounded-full bg-slate-500/2 flex items-center justify-center group-hover:scale-110 group-hover:bg-error-500 group-hover:text-white group-active:scale-100 shrink-0 transition-all"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							class="hi-mini hi-play h-5 w-5 translate-x-0.5"
						>
							<path
								d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"
							/>
						</svg>
					</div>
				</div>
			</div>

			<div class="flex items-center space-x-2 text-xs font-medium text-white">
				<div class="flex h-1 w-full grow items-center overflow-hidden rounded-lg bg-white/25">
					<div
						role="progressbar"
						class="flex items-center justify-center self-stretch bg-error-500 transition-all duration-500 ease-out"
						style="width: {Math.floor(episode.progress * 100)}%"
					/>
				</div>
			</div>
		</div>
	</a>
</div>
