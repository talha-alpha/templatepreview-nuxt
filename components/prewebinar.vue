<template>
  <div
    class="flex flex-col xl:min-h-[700px] xl:min-w-[300px] p-4 rounded-xl lg:min-h-[700px] lg:min-w-[220px] lg:p-2 bg-background text-sm mr-4"
  >
    <h2 class="text-lg font-bold mb-6">Pre-Webinar Media</h2>

    <div class="mb-4">
      <ModulesLabel class="flex overflow-hidden font-semibold mb-1"
        >Pre-Webinar Media Type</ModulesLabel
      >
      <div class="relative">
        <select
          v-model="mediaType"
          class="w-full bg-zinc-800 p-3 rounded-lg outline-none border-neutral-600 border-[1px]"
        >
          <option value="">Select Media Type</option>
          <option value="audio">Audio</option>
          <option value="video">Video</option>
        </select>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M6 9l6 6l6 -6" />
        </svg>
      </div>
    </div>

    <div v-if="mediaType" class="mb-4">
      <ModulesLabel class="flex overflow-hidden font-semibold mb-1"
        >Pre-Webinar Media File</ModulesLabel
      >
      <div class="relative">
        <select
          v-model="selectedMedia"
          class="w-full bg-zinc-800 p-3 rounded-lg outline-none border-neutral-600 border-[1px]"
        >
          <option value="">Select Media File</option>
          <option
            v-for="media in mediaOptions"
            :key="media.value"
            :value="media.value"
          >
            {{ media.label }}
          </option>
        </select>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M6 9l6 6l6 -6" />
        </svg>
      </div>
    </div>

    <ModulesButton
      class="w-full bg-blue-500 hover:bg-blue-400 text-white p-2 font-semibold rounded-lg text-center"
      @click="updateSettings"
    >
      Update Settings
    </ModulesButton>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

import Audio1 from "./audio/audio1.mp3";
import Audio2 from "./audio/audio2.mp3";
import Audio3 from "./audio/audio3.mp3";

import Video1 from "./video/video1.mp4";
import Video2 from "./video/video2.mp4";
import Video3 from "./video/video3.mp4";

const emit = defineEmits(["update"]);
const props = defineProps({
  settings: {
    type: Object,
    required: true,
  },
});

const localSettings = ref({ ...props.settings });

const mediaOptions = ref([]);
const mediaType = ref(localSettings.value.mediaType || "");
const selectedMedia = ref(localSettings.value.mediaFile || "");

watch(mediaType, (newMediaType) => {
  // ... existing mediaOptions logic
  localSettings.value.mediaType = newMediaType; // Add this
  emit("update", localSettings.value); // Emit immediately
});

watch(selectedMedia, (newMedia) => {
  localSettings.value.mediaFile = newMedia;
  emit("update", localSettings.value);
});

watch(mediaType, (newMediaType) => {
  if (newMediaType === "audio") {
    mediaOptions.value = [
      { label: "Audio 1", value: Audio1 },
      { label: "Audio 2", value: Audio2 },
      { label: "Audio 3", value: Audio3 },
    ];
  } else if (newMediaType === "video") {
    mediaOptions.value = [
      { label: "Video 1", value: Video1 },
      { label: "Video 2", value: Video2 },
      { label: "Video 3", value: Video3 },
    ];
  } else {
    mediaOptions.value = [];
  }
  selectedMedia.value = "";
});

watch(selectedMedia, (newMedia) => {
  localSettings.value.mediaFile = newMedia;
  emit("update", localSettings.value);
});

const updateSettings = () => {
  emit("update", localSettings.value);
};

watch(
  () => props.settings,
  (newSettings) => {
    localSettings.value = { ...newSettings };
  },
  { deep: true }
);
</script>
<style scoped>
select {
  appearance: none;
}
</style>
