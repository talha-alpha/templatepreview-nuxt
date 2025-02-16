<template>
  <div
    class="flex flex-col min-h-[700px] min-w-[300px] p-4 rounded-xl bg-background text-sm"
  >
    <h2 class="text-lg font-bold mb-6">Pre-Webinar Media</h2>

    <div class="mb-4">
      <Label class="flex overflow-hidden font-bold">Pre-Webinar Media Type</Label>
      <select
        v-model="mediaType"
        class="w-full bg-zinc-800 p-2 rounded-lg outline-none border-zinc-600 border-2"
      >
        <option value="">Select Media Type</option>
        <option value="audio">Audio</option>
        <option value="video">Video</option>
      </select>
    </div>

    <div v-if="mediaType" class="mb-4">
      <Label class="flex overflow-hidden font-bold">Pre-Webinar Media File</Label>
      <select
        v-model="selectedMedia"
        class="w-full bg-zinc-800 p-2 rounded-lg outline-none border-zinc-600 border-2"
      >
        <option value="">Select Media File</option>
        <option v-for="media in mediaOptions" :key="media.value" :value="media.value">
          {{ media.label }}
        </option>
      </select>
    </div>

    <Button
      class="w-full bg-blue-500 hover:bg-blue-600 text-white p-4 font-bold rounded-lg"
      @click="updateSettings"
    >
      Update Settings
    </Button>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const emit = defineEmits(["update"]);
const props = defineProps({
  settings: {
    type: Object,
    required: true,
  },
});

const mediaType = ref(""); 
const selectedMedia = ref(""); 
const localSettings = ref({ ...props.settings });

const mediaOptions = ref([]);

watch(mediaType, (newMediaType) => {
  if (newMediaType === "audio") {
    mediaOptions.value = [
      { label: "Audio File 1", value: "/audio/audio1.mp3" },
      { label: "Audio File 2", value: "/audio/audio2.mp3" },
      { label: "Audio File 3", value: "/audio/audio3.mp3" },
    ];
  } else if (newMediaType === "video") {
    mediaOptions.value = [
      { label: "Video File 1", value: "/video/video1.mp4" },
      { label: "Video File 2", value: "/video/video2.mp4" },
      { label: "Video File 3", value: "/video/video3.mp4" },
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

