<script lang="ts">
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import MiddleSection from './MiddleSection.svelte';
	import LeftSection from './LeftSection.svelte';
	import type { Episode } from '$lib/consumet/types';
	import type { Info } from '$lib/simkl/types';
	import type { inList } from '$lib/simkl/routes/auth/user/checkItemList';
	import type { Characters } from '$lib/anilist/types';
	import type { authed } from '$lib/types';
	import type { Writable } from 'svelte/store';
	import type { EpisodeData } from '$lib/anify/types';
	export let data: {
		authed: authed;
		pathname: string;
		info: Info;
		characters: Characters | null;
		isInList: inList | null;
		episodes: EpisodeData[];
		nextEpisodeDate: Date | undefined;
	};
	let value: number = 0;

	export let lightSwitch: Writable<boolean>;
</script>

<div class="container grid lg:grid-rows-5 grid-cols-1 lg:flex gap-2 p-1">
	<div class="lg:w-2/6 2xl:w-1/5 row-start-2 lg:flex rounded-lg">
		<slot name="left-column">
			<LeftSection {data} />
		</slot>
	</div>

	<div
		class="wrapper !z-1 px-2 pt-2 row-start-1 w-full text-xs rounded-lg relative variant-filled-surface h-fit shadow-xl shadow-secondary-500/20 lg:flex-auto mx-auto lg:mx-2 lg:w-3/5"
		style="transition: width 200ms ease-in-out;"
	>
		<slot name="middle-column">
			<div id="MiddleSection">
				<MiddleSection {data} {lightSwitch} />
			</div>
		</slot>
	</div>
</div>

<!-- svelte-ignore a11y-media-has-caption -->
