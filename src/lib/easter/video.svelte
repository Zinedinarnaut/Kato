<script lang="ts">
	export let parent: any;
	import { goto } from '$app/navigation';
	// ... the rest of your script
	import { modalStore, type ModalSettings, type ModalComponent } from '@skeletonlabs/skeleton';
	function handleVideoEnded() {
		modalStore.close();
		goto('/watch/kaifuku-jutsushi-no-yarinaoshi?id=1211761');
	}
	// Base Classes
	const cBase = 'relative w-modal-wide shadow-xl aspect-video !p-0 !m-0';
	const cButton = 'absolute -top-3 -right-3 z-1 btn-icon variant-filled';
	const cIframe = 'bg-black w-full aspect-video rounded-container-token overflow-hidden';
</script>

<div class="modal-example-form {cBase}">
	<button class={cButton} on:click={parent.onClose}>✕</button>
	<video
		on:ended={handleVideoEnded}
		class={cIframe}
		src="/player/yun.mp4"
		title="YouTube video player"
		controls
    autoplay
    volume = 0
	/>
</div>
