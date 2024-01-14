<script lang="ts">
	import type { Info } from '$lib/simkl/types';
	import removeTags from '$lib/utils/removeTags';
	export let random: Info | null;
	export let randomLogo: string | null;
	import { getLargeFanart } from '$lib/simkl/routes/utils/images';
	let isPlayerVisible = false;
	setTimeout(() => {
		isPlayerVisible = true;
	}, 5000);

	let defaultStyle =
		'-top-32 2xl:-top-56 rounded-xl max-h-56 lg:max-h-72 2xl:max-h-96 overflow-hidden md:max-h-64 flex w-full left-0 2xl:-left-20 right-0 rounded-lg md:w-[750px]';
</script>

<div class="flex h-[55%] md:h-[75%] overflow-y-clip items-center">
	<!-- svelte-ignore a11y-media-has-caption -->
	<div
		class="md:h-[80%] h-3/4 blur lg:blur-0 md:flex w-full opacity-50 absolute inset-0 duration-250"
	>
		<img
			width="1912"
			height="779"
			src={'//wsrv.nl/?url=' + getLargeFanart(random?.fanart) + '&w=1912&h=779&output=webp'}
			alt=""
			loading="eager"
			class="object-cover absolute w-full h-full"
			srcset=""
		/>
		<div class="fade" />
	</div>
	<!-- {#if isPlayerVisible}
		<video
			muted
			autoplay
			class="h-[55%] md:h-[75%] w-full opacity-0 absolute duration-250 hero-video fade-in"
		>
			<source src="https://proxy.vnxservers.com/youtube/_ce5_P1Hj5A" type="video/mp4" />
			Your browser does not support HTML video.
		<x/video>
	{/if} -->
	<div class="relative mx-auto container mt-28 md:mt-0 px-10 md:px-14 max-500px:px-0 text-white">
		<div class={defaultStyle}>
			<div
				class="card-hover   px-10 2xl:left-[60px] max-[500px]:px-0 relative"
			>
				{#if randomLogo}
					<!-- svelte-ignore a11y-missing-attribute -->
					<!-- TODO: fix image -->
					<img
						height="208"
						width="396"
						loading="eager"
						src={'//wsrv.nl/?url=' + randomLogo + '&h=208&w=396&output=webp'}
						class="w-ful 2xl:h-52 h-36 object-contain hidden md:flex justify-self-start w-auto px-0 font-bold"
					/>
				{:else}
					<header
						class=" hidden md:block line-clamp-2 card-header mb-5 px-0 md:text-4xl text-3xl font-bold"
					>
						{random?.title}
					</header>
				{/if}
				<header
					class=" md:hidden line-clamp-2 mb-2 card-header px-0 md:text-4xl text-2xl font-bold"
				>
					{random?.title}
				</header>
				<section
					class=" line-clamp-2 md:line-clamp-2 mb-3 2xl:mb-4 py-1 px-0 md:text-lg font-medium"
				>
					{random?.overview ? removeTags(random?.overview) : 'No overview'}
				</section>
				<footer class="card-footer md:flex 2xl:mt-7 justify-start px-0 w-full gap-4">
					<a
						href="/watch/{random?.ids.slug ?? random?.title.replaceAll(' ', '-')}?id={random?.ids
							.simkl}"
						type="button"
						class="btn-sm flex items-center gap-1 md:btn py-4 2xl:px-10 font-medium !text-white variant-ghost-secondary rounded-lg md:rounded-lg max-[700px]:w-[150px]"
						><svg
							class="hi-mini hi-play-circle inline-block w-5 h-5"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
							><path
								fill-rule="evenodd"
								d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm6.39-2.908a.75.75 0 01.766.027l3.5 2.25a.75.75 0 010 1.262l-3.5 2.25A.75.75 0 018 12.25v-4.5a.75.75 0 01.39-.658z"
								clip-rule="evenodd"
							/></svg
						>
						<span>Watch Now</span>
					</a>
				</footer>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
			</div>
		</div>
	</div>
</div>
<svg xmlns="http://www.w3.org/2000/svg">
	<filter id="filter">
		<feColorMatrix
			type="matrix"
			values=" 0.783  0.000  0.000  0.000  0.034 
               0.000  1.000  0.054  0.000  0.019 
               0.000  0.054  1.000  0.054  0.019 
               0.000  0.000  0.000  1.000  0.000"
		/>
	</filter>
</svg>

<style>
	.fade {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 70%;
		z-index: 1;
		background: linear-gradient(0deg, #12111a, transparent);
		opacity: 0.9;
	}
</style>
