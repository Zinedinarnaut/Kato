<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let url = ``;

	onMount(() => (url = window.location.href));
</script>

<!-- Pages: Errors: 503 -->
<!-- Page Container -->
<div
	id="page-container"
	class="flex absolute inset-0 flex-col mx-auto w-full min-h-screen min-w-[320px]"
>
	<!-- Page Content -->
	<main id="page-content" class="flex flex-auto flex-col max-w-full">
		<div class="relative flex items-center min-h-screen overflow-hidden">
			<!-- Left/Right Background -->
			<div
				class="absolute left-0 top-0 bottom-0 w-48 bg-gray-50 transform md:skew-x-6 -ml-44 md:-ml-28 variant-filled-surface"
				aria-hidden="true"
			/>
			<div
				class="absolute right-0 top-0 bottom-0 w-48 bg-gray-50 transform md:skew-x-6 -mr-44 md:-mr-28 variant-filled-surface"
				aria-hidden="true"
			/>
			<!-- END Left/Right Background -->

			<!-- Error Content -->
			<div
				class="relative text-center space-y-16 container xl:max-w-7xl mx-auto px-8 py-16 lg:py-32"
			>
				<div>
					<div class="mb-5 text-gray-300 dark:text-gray-600">
						<svg
							class="hi-outline hi-wrench-screwdriver inline-block w-12 h-12"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
							/></svg
						>
					</div>
					<div class="text-6xl md:text-7xl font-extrabold text-gray-600 dark:text-gray-400">
						{$page.status}
					</div>
					<div
						class="w-12 h-1.5 bg-gray-200 rounded-lg mx-auto my-6 md:my-10 dark:bg-gray-700"
						aria-hidden="true"
					/>
					<h1 class="text-2xl md:text-3xl font-extrabold mb-3">System Jutsu Failed!</h1>
					<div
						class="md:leading-relaxed font-medium text-2xl text-gray-500 lg:w-4/5 mx-auto dark:text-gray-400"
					>
						Oops! Something went wrong with our ninja tech. We're working on it to get things back
						on track. Try refreshing the page or come back later.
					</div>
				</div>
				<a
					href={url}
					class="group inline-flex justify-center items-center space-x-2 font-semibold rounded-lg px-3 py-2 leading-5 text-sm variant-filled-secondary hover:text-gray-900 hover:shadow-sm active:shadow-none"
				>
					<svg
						class="hi-mini hi-arrow-path inline-block w-5 h-5 transition opacity-50 group-hover:opacity-100"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
						><path
							fill-rule="evenodd"
							d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z"
							clip-rule="evenodd"
						/></svg
					>
					<span>Try Refreshing</span>
				</a>
				<a
					data-sveltekit-preload-data="hover"
					href="../"
					class="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-3 py-2 leading-5 text-sm rounded variant-filled-secondary text-white shadow-sm border-none hover:shadow focus:ring focus:ring-gray-500 focus:ring-opacity-25 active:shadow-none"
				>
					<svg
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						class="opacity-50 hi-solid hi-arrow-left inline-block w-5 h-5"
						><path
							fill-rule="evenodd"
							d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
							clip-rule="evenodd"
						/></svg
					>
					<span>Back to Home</span>
				</a>
			</div>
			<img
				src="https://pnganime.com/web/images/A/Aki-chainsaw-man-transparent-png.png"
				class=" h-[95%] mt-11 absolute hidden lg:opacity-50 xl:opacity-100 lg:block md:inset-0"
				alt=""
				srcset=""
			/>

			<!-- END Error Content -->
		</div>
	</main>
	<!-- END Page Content -->
</div>
<!-- END Page Container -->
<!-- END Pages: Errors: 503 -->
