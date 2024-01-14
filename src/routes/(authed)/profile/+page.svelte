<script lang="ts">
	import Tabs from '$lib/components/profike/Tabs.svelte';	import SvelteSeo from 'svelte-seo';
	export let data;

	let tabSet: number = data.id ?? 0;

	function calcTotalAnime(): number {
		const anime = data?.stats?.anime;
		if (!anime) return 0;
		return (
			(anime?.watching?.count ?? 0) +
			(anime?.completed?.count ?? 0) +
			(anime?.hold?.count ?? 0) +
			(anime?.plantowatch?.count ?? 0)
		);
	}
</script>
<SvelteSeo
	title="Kato - Watch Anime online with DUB and SUB for FREE"
	description="Kato is the best free anime streaming website with Ai-Tools where you can watch English Subbed and Dubbed anime online. WATCH NOW! No Ads GUARANTEED! "
	canonical="https://kato.to/profile"
	keywords="Anime to watch, watch anime,anime online, free anime online, online anime, anime streaming, stream anime online, english anime, english dubbed anime, Sub anime, Dub anime, Ai, Kato"
	openGraph={{
		title: 'Kato - Watch Anime online with DUB and SUB for FREE',
		description:
			'Kato is the best free anime streaming website with Ai-Tools where you can watch English Subbed and Dubbed anime online. WATCH NOW! No Ads GUARANTEED! ',
		url: 'https://kato.to/profile',
		type: 'website',
		site_name: 'Kato'
	}}
	twitter={{
		card: 'summary_large_image',
		site: '@Kat0TV',
		title: 'Kato - Watch Anime online with DUB and SUB for FREE',
		description:
			'Kato is the best free anime streaming website with Ai-Tools where you can watch English Subbed and Dubbed anime online. WATCH NOW! No Ads GUARANTEED! ',
		image: 'https://kato.to/iconn.png'
	}}
/>
<!-- Page Partials: User Profile: With Cards -->
<div class="space-y-4 mt-16 lg:mt-0 absolute inset-0">
	<!-- Banner -->
	<div
		class=" flex flex-col relative items-center justify-end h-80 from-surface-500 to-error-800 rounded-lg text-center pb-5"
	>
		<img
			src="https://wallpapercave.com/wp/wp6081408.jpg"
			class="inset-0 opacity-50 absolute h-80 object-cover w-full"
			alt=""
			srcset=""
		/>
		<div class="mb-5 z-50">
			<div class="rounded-full bg-white bg-opacity-50 p-1">
				<img
					src={data.authed.userSettings?.user.avatar}
					alt="User Avatar"
					class=" w-20 h-20 opacity-100 rounded-full"
				/>
			</div>
		</div>
		<h3 class="text-xl z-50 font-bold text-white mb-2">{data.authed.userSettings?.user.name}</h3>
		<!-- <h4 class="text-sm font-medium text-white text-opacity-90">UI Designer</h4> -->
		<!-- Stats Section: Simple Dark -->
		<div class="pt-1 mr-[30px] z-50">
			<div class="container xl:max-w-7xl">
				<div class="flex gap-20">
					<dl class="space-y-1 h-max">
						<dt class="text-xl font-semibold text-white">{data.stats?.anime.completed.count}</dt>
						<dd class="text-sm tracking-wide font-extrabold text-pink-400">Anime Watched</dd>
					</dl>
					<dl class="space-y-1">
						<dt class="text-xl font-semibold text-white">
							{data.stats?.anime.watching.left_to_watch_episodes}
						</dt>
						<dd class="text-sm tracking-wide font-extrabold text-pink-400">Episodes Left</dd>
					</dl>
					<dl class="space-y-1">
						<dt class="text-xl font-semibold text-white">
							{calcTotalAnime()}
						</dt>
						<dd class="text-sm tracking-wide font-extrabold text-pink-400">Total Anime</dd>
					</dl>
				</div>
			</div>
		</div>
		<!-- END Stats Section: Simple Dark -->
	</div>
	<div class=" max-[1700px]:px-[2rem]">
		<Tabs profileData={data} {tabSet} />
	</div>
</div>
<!-- END Banner -->
