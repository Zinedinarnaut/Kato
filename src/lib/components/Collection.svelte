<script lang="ts">
	import { getLargePoster } from '$lib/simkl/routes/utils/images';
	import type { ICollection } from '$lib/simkl/types/Collection';
	import CollectionModal from './modals/collectionModal.svelte';
	export let title: string;

	let showModal: boolean = false;

	$: title;
	export let descriptor: string;
	$: descriptor;
	let skew = 3;
	$: skew;
	export let items: IItems[];
	$: items;

	const onMouseDown = (e: any) => {
		showModal = true;
	};
</script>

<!-- FIXME:fix skew on hover -->
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<!-- TODO: 	on:mouseover={() => {
		skew = 6;
	}}
	on:mouseout={() => {
		skew = 3;
	}} -->

<CollectionModal bind:showModal data={{ items, title, descriptor }} />

<button
	class="card lg:px-5 variant-filled-surface relative rounded-xl bg-secondary-hover-token cursor-pointer"
	on:click={onMouseDown}
>
	<header class="card-header">
		<h4 class="p-5 text-center font-bold">{descriptor}<br />{title}</h4>
	</header>
	<footer class="card-footer flex overflow-hidden">
		<div class="relative lg:h-52 2xl:h-44 w-full flex left-3 md:left-5">
			<img
				loading="lazy"
				height="197"
				width="183"
				src={'//wsrv.nl/?url=' + getLargePoster(items[0].poster) + '&w=183&h=197'}
				alt=""
				class="rounded-xl relative border-4 2xl:top-8 border-secondary-600 top-14 -rotate-[8deg] md:w-40 w-28 object-cover"
				srcset=""
			/>

			<img
				loading="lazy"
				height="176"
				width="160"
				src={'//wsrv.nl/?url=' + getLargePoster(items[1].poster) + '&w=160&h=176'}
				alt=""
				class="rounded-xl w-28 md:w-40 border-4 2xl:top-10 border-secondary-600 relative top-16 -translate-x-6 object-cover"
				srcset=""
			/>

			<img
				loading="lazy"
				height="199"
				width="186"
				src={'//wsrv.nl/?url=' + getLargePoster(items[2].poster) + '&w=186&h=199'}
				class="rounded-xl md:w-40 border-4 border-secondary-600 relative top-[85px] rotate-[9deg] w-28 2xl:top-[65px] -translate-x-14 object-cover"
				alt=""
				srcset=""
			/>
		</div>
	</footer>
</button>
