<template>
  <div
    class="flex-row overflow-hidden min-h-[700px] min-w-[300px] m-2 p-4 rounded-xl justify-end bg-none"
  >
    <h2 class="text-lg font-bold mb-6">Template</h2>

    <p
      class="flex overflow-hidden mt-10 text-gray-200 border-b-2 border-zinc-600 py-2 font-bold"
    >
      Background
    </p>

    <p
      class="flex overflow-hidden mt-4 text-gray-200 border-b-2 border-zinc-600 py-2 font-bold justify-between"
    >
      Headline
    </p>

    <p
      class="flex overflow-hidden mt-4 text-gray-200 border-b-2 border-zinc-600 py-2 font-bold justify-between"
    >
      Sub Headline
    </p>

    <p
      class="flex overflow-hidden mt-4 text-gray-200 border-b-2 border-zinc-600 py-2 font-bold justify-between"
    >
      Timer Text
    </p>

    <p
      class="flex overflow-hidden mt-4 text-gray-200 border-b-2 border-zinc-600 py-2 font-bold justify-between"
    >
      Pre-Webinar Media
    </p>

    <p
      class="flex overflow-hidden mt-4 text-gray-200 border-b-2 border-zinc-600 py-2 font-bold justify-between"
    >
      CountDown Timer
    </p>

    <button
      class="flex overflow-hidden mt-12 text-gray-200 bg-blue-500 hover:bg-blue-600 justify-center rounded-xl p-4 font-bold w-full"
    >
      Save Settings
    </button>
  </div>
</template>

<script setup>
import background from "./background.vue";
</script>
