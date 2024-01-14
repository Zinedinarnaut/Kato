<script>
  export let data;
</script>
<div class="  lg:w-[25%] xl:w-1/5 2xl:left-32 h-fit relative">
  <img
    src="/hand.png"
    class="absolute w-40 hidden lg:flex lg:w-44 mx-auto -top-10 mt-4 lg:-top-[71px] opacity-60 inset-0 h-fit"
    alt=""
    srcset=""
  />
  <div
    class="block min-w-full px-8 py-5 relative  lg:top-28 border border-secondary-800 border-opacity-70 rounded-lg shadow variant-filled-surface "
  >
    <h5
      class="mb-2 flex justify-center items-center !text-2xl font-bold tracking-tight gap-2 !text-error-600"
    >
      {data.rating}/10 <span class="text-sm text-gray-500">{data.votes} reviews</span>
    </h5>
    <div class="flex justify-center">
      <div class="flex w-fit flex-col gap-2 justify-center">
        <div
          class="flex items-center gap-2 w-fit justify-center bg-secondary-backdrop-token rounded-xl p-2"
        >
          <svg
            aria-hidden="true"
            class="w-8 h-8 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            ><title>First star</title><path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            /></svg
          >
          <svg
            aria-hidden="true"
            class="w-8 h-8 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            ><title>Second star</title><path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            /></svg
          >
          <svg
            aria-hidden="true"
            class="w-8 h-8 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            ><title>Third star</title><path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            /></svg
          >
          <svg
            aria-hidden="true"
            class="w-8 h-8 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            ><title>Fourth star</title><path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            /></svg
          >
          <svg
            aria-hidden="true"
            class="w-8 h-8 text-gray-300 dark:text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            ><title>Fifth star</title><path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            /></svg
          >
        </div>
        <span class="tracking-wide text-slate-300 text-sm text-center text-opacity-90"
          >Rate this Anime or die?!</span
        >
      </div>
    </div>
  </div>
</div>