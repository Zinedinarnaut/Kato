<script lang="ts">
	export let text: string;
	export let svg: boolean = false;
	export let positionY: 'top' | 'bottom';
	export let positionX: 'left' | 'right';
	export let css = '';
</script>

<div
	class="m-4 absolute overflow-hidden {positionY === 'top' ? ' top-0' : ' bottom-0'}{positionX ===
	'left'
		? ' left-0'
		: ' right-0'} h-8 min-w-28 max-w-36 px-2 gap-2 rounded-xl text-sm text-center justify-center flex items-center {css}"
>
	{#if svg}
		<svg
			class="hi-outline hi-clock inline-block w-5 h-5"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			aria-hidden="true"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
			/></svg
		>
	{/if}
	<p class="line-clamp-1">{text}</p>
</div>
