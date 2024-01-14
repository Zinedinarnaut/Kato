<script lang="ts">
	let isHovering = false;
	import type { Edge } from '$lib/anilist/types/characters';
	export let data: Edge;
</script>

<div
	class="w-40 h-52 relative rounded-lg overflow-hidden"
	on:mouseenter={() => {
		if (data?.voiceActorRoles[0]?.voiceActor) {
			isHovering = true;
		}
	}}
	on:mouseleave={() => {
		isHovering = false;
	}}
>
	<img
		class="w-full h-full transition-opacity duration-500 absolute {isHovering
			? 'opacity-0'
			: 'opacity-100'} top-0 left-0"
		src={data?.node?.image?.large}
		alt=""
	/>
	<img
		class="w-full h-full top-0 left-0"
		src={data?.voiceActorRoles[0]?.voiceActor?.image.large}
		alt=""
	/>
	<div
		class=" p-2 absolute top-0 left-0 align-bottom flex flex-col-reverse w-full h-full bg-gradient-to-b from-transparent via-transparent to-black"
	>
		<div class="font-semibold text-xs opacity-80 text-white">{data.role}</div>
		<div class="font-bold text-white text-sm">
			{isHovering ? data?.voiceActorRoles[0]?.voiceActor?.name.full : data.node.name.full}
		</div>
	</div>
</div>
