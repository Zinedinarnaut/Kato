<script lang="ts">
	import { getLargeFanart, getLargePoster } from '$lib/simkl/routes/utils/images';
	import SvelteSeo from 'svelte-seo';
	import Container from '$lib/components/infoPage/Container.svelte';

	let value: number = 0;

	import Hero from '$lib/components/infoPage/Hero.svelte';
	import Maintenance from '$lib/components/Maintenance.svelte';
	import { writable, type Writable } from 'svelte/store';

	export let data;
	$: data;

	const lightSwitch: Writable<boolean> = writable();
	$: lightSwitch.set(false);
</script>

<SvelteSeo
	title={`Kato - ${data.info.title}`}
	description={data.info.overview}
	canonical="http://localhost:5173/watch"
	keywords={`Anime to watch, watch anime,anime online, free anime online, online anime, anime streaming, stream anime online, english anime, english dubbed anime, Sub anime, Dub anime, Ai, Kato, ${data.info.title.replaceAll(
		' ',
		','
	)}`}
	openGraph={{
		title: `Kato - Watch ${data.info.title} For FREE`,
		description: data.info.overview,
		url: 'http://localhost:5173/watch',
		type: 'website',
		site_name: 'Kato',
		//@ts-ignore
		image:
			'https://api.streamsora.live/utils/image-proxy?url=' + data.info.fanart
				? getLargeFanart(data.info.fanart)
				: getLargePoster(data.info.poster) + '&w=1912&h=320&output=webp'
	}}
	twitter={{
		card: 'summary_large_image',
		site: '@Kat0TV',
		title: `Kato - ${data.info.title}`,
		description: '',
		image:
			'https://api.streamsora.live/utils/image-proxy?url=' + data.info.fanart
				? getLargeFanart(data.info.fanart)
				: getLargePoster(data.info.poster) + '&w=1912&h=320&output=webp',
		imageAlt: ''
	}}
/>
<div
	class={`background ${
		!$lightSwitch ? '!opacity-0' : '!opacity-70'
	} absolute top-0 left-0 w-full h-full bg-black pointer-events-none transition-opacity duration-200 z-[1]`}
/>

<!--<div class="absolute inset-0 w-full h-full z-100">
<Maintenance />
</div>-->
<div class="md:px-10">
	 <img
	src="/sunset.webp"
	class="relative blur inset-0 opacity-10 h-3/4 w-full object-cover"
	alt=""
	srcset=""
/>
	<Container {data} {lightSwitch} />

	<main class="w-full h-[500px]">
		<!-- @ts-ignore -->
		<Hero {data} />
	</main>
</div>
