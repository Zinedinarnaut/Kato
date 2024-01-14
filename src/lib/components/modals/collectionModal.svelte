<script lang="ts">
	import type { ICollection } from '$lib/simkl/types/Collection';
	import ItemCard from '../ItemCard.svelte';

	export let showModal: boolean = false;
	export let data: ICollection;
	let dialog: HTMLDialogElement;

	$: if (dialog && showModal && data) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
	class="collectionDialog variant-filled-surface rounded-[15px] drop-shadow-md focus:border-none focus:outline-none w-[90%] max-h-[90%] overflow-auto transition-all opacity-100"
>
	<div class="flex flex-col flex-wrap gap-3">
		<div>
			<div class="text title">{data.descriptor}</div>
			<div class="text descriptor">{data.title}</div>
		</div>

		<div class="container w-full">
			<div class="grid wrapper">
				{#if data?.items}
					{#each data.items as item}
						<ItemCard anime={item}>
							<p slot="UnderTitle1">{item.year}</p>
							<p slot="UnderTitle2" class="capitalize">, {item.anime_type}</p>
						</ItemCard>
					{/each}
				{/if}
			</div>
		</div>
	</div>
</dialog>

<style>
	.container {
		overflow: hidden;
		padding-top: 1rem;
		width: 100%;
	}
	.wrapper {
		gap: 1rem 0.9rem;
		width: 100%;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		align-items: center;
		justify-items: center;
	}
	.text {
		text-align: center;
		font-size: 1rem;
	}
	.title {
		font-size: 1.5rem;
		font-weight: bold;
	}
	.descriptor {
		font-size: 1.3rem;
	}

	.collectionDialog[open] {
		animation: show 0.5s ease-in-out;
		/* animation-timing-function: cubic-bezier(0.9, 0.9, 0.9, 1); */
	}

	.collectionDialog::backdrop {
		background: black;
		opacity: 0.5;
	}

	@keyframes showBackdrop {
		from {
			backdrop-filter: blur(0);
		}
		to {
		}
	}

	@keyframes show {
		0% {
			transform: translateY(-110%);
		}
		100% {
			transform: translateY(0%);
		}
	}
</style>
