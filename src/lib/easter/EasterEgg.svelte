<script lang="ts">
	import { modalStore, type ModalSettings, type ModalComponent } from '@skeletonlabs/skeleton';
	import Video from './video.svelte';
	function moveButton(event) {
		const button = event.currentTarget;

		const randomPosition = () => Math.floor(Math.random() * 300) - 200;

		button.style.transform = `translate(${randomPosition()}px, ${randomPosition()}px)`;
	}
	const VideoComponent: ModalComponent = {
		// Pass a reference to your custom component
		ref: Video,
		// Add the component properties as key/value pairs
		props: { background: 'bg-red-500' },
		// Provide a template literal for the default component slot
		slot: '<p>Skeleton</p>'
	};
	function modalVideo(): void {
		modalStore.close();
		const modalVideo: ModalSettings = {
			type: 'component',
			// Pass the component directly:
			component: VideoComponent
		};
		modalStore.trigger(modalVideo);
	}
</script>

<div class="card w-[50vw] h-[50vh] variant-ghost-primary">
	<header class="card-header pb-4 border-b font-bold border-slate-500 text-5xl">Yo, you 18+ or what?! 🚨</header>
	<section class="p-4 text-3xl border-b border-slate-500">
		Aight, listen up! You tryna search for "Redo of Healer," which is some next-level freaky sh*t!
		You sure you got the "grown-ass adult" vibes to handle this kinda content? Just remember, you
		ain't heard it from me, but sh*t's about to get real! Keep an eye out for the po-po! 😏👮‍♂️
	</section>
	<footer class="card-footer">
		<div class="text-right space-x-1 py-4 px-5">
			<button
				on:mouseover={moveButton}
				type="button"
				class="move-btn inline-flex justify-center items-center space-x-2 border font-semibold rounded-lg px-3 py-2 leading-5 text-sm variant-filled-success"
			>
				My bad, yo! I ain't about that life! 🙈
			</button>
			<button
				type="button"
				class="inline-flex justify-center items-center space-x-2 border font-semibold rounded-lg px-3 py-2 leading-5 text-sm border-rose-700 bg-rose-700 text-white hover:text-white hover:bg-rose-600 hover:border-rose-600 focus:ring focus:ring-rose-400 focus:ring-opacity-50 active:bg-rose-700 active:border-rose-700 dark:focus:ring-rose-400 dark:focus:ring-opacity-90"
				on:click={modalVideo}
			>
				Hell yeah, I'm 18+! 🚀
			</button>
		</div>
	</footer>
	<h4 class="font-bold text-teal-300">Try to click green btn Yun if u are indeed below 18 it will accept u otherwise click red </h4>
</div>
<div><img src="/20.png" class="w-96" alt="" srcset=""></div>