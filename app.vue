<template>
  <div
    class="xl:min-h-[800px] xl:max-w-[1500px] lg:min-h-[620px] lg:max-w-[1100px] text-white flex overflow-hidden m-[150px] mt-[30px] rounded-xl bg-zinc-900 border-black border-2"
  >
    <div
      class="flex-col overflow-hidden xl:min-h-[750px] xl:min-w-[1100px] lg:min-h-[600px] lg:min-w-[600px] justify-start bg-zinc-800 m-4 p-4 rounded-xl"
    >
      <strong
        class="text-gray-200 flex font-extrabold p-2 border-b-2 border-zinc-600 self-center"
      >
        Template Preview
      </strong>
      <div
        class="relative xl:min-h-[770px] rounded-xl bg-zinc-950 m-4 overflow-hidden"
        id="screen"
        :style="{
          backgroundImage: backgroundSettings.bgImage
            ? `url(${backgroundSettings.bgImage})`
            : 'none',
          backgroundColor: backgroundSettings.bgColor,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }"
      >
        <video
          v-if="prewebinarSettings.mediaType === 'video'"
          ref="mediaElement"
          :src="prewebinarSettings.mediaFile"
          @ended="isPlaying = false"
          muted
          loop
          autoplay
          class="absolute top-0 left-0 w-full h-full object-cover"
        ></video>

        <audio
          v-else-if="prewebinarSettings.mediaType === 'audio'"
          ref="mediaElement"
          :src="prewebinarSettings.mediaFile"
          @ended="isPlaying = false"
          class="hidden"
        ></audio>

        <div class="absolute inset-0 bg-black bg-opacity-50"></div>

        <div class="relative z-10 p-6 text-white">
          <p :style="headlineStyle">{{ headlineSettings.text }}</p>
          <p :style="subheadlineStyle">{{ subheadlineSettings.text }}</p>
          <p :style="timertextStyle">{{ timertextSettings.text }}</p>

          <div class="flex gap-2 justify-center mt-4">
            <div
              v-if="countdownSettings.time > 0"
              :style="countdownContainerStyle"
            >
              <span :style="timerTextStyle" class="rounded-lg">
                {{ formatTime(countdownSettings.time) }}
              </span>
              <div class="flex justify-around gap-2">
                <span :style="periodTextStyle" class="p-2 rounded-lg"
                  >MINUTES</span
                >
                <span :style="periodTextStyle" class="p-2 rounded-lg"
                  >SECONDS</span
                >
              </div>
            </div>
          </div>

          <div
            v-if="prewebinarSettings.mediaType === 'video'"
            class="p-2 flex justify-center gap-4 mt-4"
          >
            <button
              @click="togglePlay"
              class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
            >
              <svg
                v-if="isPlaying"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14.752 11.168l-5.197-2.985A1 1 0 008 9v6a1 1 0 001.555.832l5.197-2.985a1 1 0 000-1.664z"
                ></path>
              </svg>
              {{ isPlaying ? "Pause" : "Play" }}
            </button>
          </div>
          <div
            v-if="prewebinarSettings.mediaType === 'audio'"
            class="p-2 flex justify-center gap-4 mt-4"
          >
            <button
              @click="togglePlay"
              class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
            >
              <svg
                v-if="isPlaying"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14.752 11.168l-5.197-2.985A1 1 0 008 9v6a1 1 0 001.555.832l5.197-2.985a1 1 0 000-1.664z"
                ></path>
              </svg>
              {{ isPlaying ? "Pause" : "Play" }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div id="sidenav" class="p-2 rounded-xl">
      <div
        class="flex-row overflow-hidden xl:min-h-[700px] xl:min-w-[300px] lg:min-h-[700px] lg:min-w-[220px] lg:p-2 rounded-xl justify-end"
      >
        <button
          v-if="activeComponent"
          @click="backToSidebar"
          class="flex overflow-hidden text-gray-200 justify-center rounded-xl p-4 font-bold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-arrow-left"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 12l14 0" />
            <path d="M5 12l6 6" />
            <path d="M5 12l6 -6" />
          </svg>
          Back
        </button>

        <!-- Sidebar Menu -->
        <div v-if="!activeComponent">
          <h2 class="text-lg font-bold my-2 text-gray-200">Template</h2>
          <p
            v-for="comp in activeComponents"
            :key="comp"
            class="flex overflow-hidden mt-4 text-gray-200 border-b-2 border-zinc-600 py-2 font-bold cursor-pointer"
            @click="toggleSettings(comp)"
          >
            {{ comp }}
          </p>
        </div>

        <!-- Dynamic Component -->
        <div>
          <component
            v-if="activeComponent"
            :is="dynamicComponent"
            :settings="getSettings(activeComponent)"
            @update="updateSettings(activeComponent, $event)"
          />
        </div>

        <!-- Save Button -->
        <button
          v-if="!activeComponent"
          class="flex overflow-hidden mt-12 text-gray-200 bg-blue-500 hover:bg-blue-600 justify-center rounded-xl p-2 font-bold w-full"
        >
          Save Settings
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import Background from "@/components/background.vue";
import Headline from "@/components/headline.vue";
import Subheadline from "@/components/subheadline.vue";
import Timertext from "@/components/timertext.vue";
import Prewebinar from "@/components/prewebinar.vue";
import Countdown from "@/components/countdown.vue";

const activeComponents = [
  "Background",
  "Headline",
  "Subheadline",
  "Timertext",
  "Prewebinar",
  "Countdown",
];

const activeComponent = ref(null);
const dynamicComponent = ref(null);
const countdownInterval = ref(null);

const componentSettings = ref({
  Headline: {
    text: "This is your Opening Room Headline",
    alignment: "center",
    fontFamily: "Arial",
    fontWeight: "Bold",
    fontSize: 40,
    fontColor: "#FFFFFF",
    bgColor: "transparent",
    padding: { top: 150, right: 10, bottom: 10, left: 10 },
  },
  Subheadline: {
    text: "This is your subheadline",
    alignment: "center",
    fontFamily: "Cambria",
    fontWeight: "Normal",
    fontSize: 28,
    fontColor: "#FFFFFF",
    bgColor: "transparent",
    padding: { top: 5, right: 5, bottom: 5, left: 5 },
  },
  Timertext: {
    text: "Starting in.....",
    alignment: "center",
    fontFamily: "Arial",
    fontWeight: "Normal",
    fontSize: 20,
    fontColor: "#FFFFF0",
    bgColor: "transparent",
    padding: { top: 5, right: 5, bottom: 5, left: 5 },
  },
  Prewebinar: {
    text: "Webinar starting soon!",
    fontSize: 22,
    fontColor: "#008000",
  },
  Countdown: {
    time: 1800,
    duration: 30,
    selectedElement: "timer",
    period: {
      fontFamily: "Arial",
      fontWeight: "Normal",
      fontSize: 12,
      fontColor: "#FFFFFF",
      bgColor: "#000000",
    },
    timer: {
      fontFamily: "Arial",
      fontWeight: "Bold",
      fontSize: 48,
      fontColor: "#FFFFFF",
      bgColor: "transparent",
    },
    bgColor: "transparent",
  },
  Background: { bgColor: "#121212", bgImage: null },
});

const headlineSettings = computed(() => componentSettings.value.Headline);
const subheadlineSettings = computed(() => componentSettings.value.Subheadline);
const timertextSettings = computed(() => componentSettings.value.Timertext);
const countdownSettings = computed(() => componentSettings.value.Countdown);
const backgroundSettings = computed(() => componentSettings.value.Background);

const headlineStyle = computed(() => getTextStyle(headlineSettings.value));
const subheadlineStyle = computed(() =>
  getTextStyle(subheadlineSettings.value)
);
const timertextStyle = computed(() => getTextStyle(timertextSettings.value));

const timerTextStyle = computed(() => ({
  fontFamily: countdownSettings.value.timer.fontFamily,
  fontWeight: countdownSettings.value.timer.fontWeight,
  fontSize: `${countdownSettings.value.timer.fontSize}px`,
  color: countdownSettings.value.timer.fontColor,
  backgroundColor: countdownSettings.value.timer.bgColor,
  textAlign: "center",
  display: "block",
}));

const periodTextStyle = computed(() => ({
  fontFamily: countdownSettings.value.period.fontFamily,
  fontWeight: countdownSettings.value.period.fontWeight,
  fontSize: `${countdownSettings.value.period.fontSize}px`,
  color: countdownSettings.value.period.fontColor,
  backgroundColor: countdownSettings.value.period.bgColor,
}));

const countdownContainerStyle = computed(() => ({
  backgroundColor: countdownSettings.value.bgColor,
  padding: "20px",
  borderRadius: "8px",
  margin: "0 auto",
  width: "fit-content",
}));

const getTextStyle = (settings) => ({
  fontFamily: settings.fontFamily,
  fontWeight: settings.fontWeight,
  fontSize: `${settings.fontSize}px`,
  color: settings.fontColor,
  backgroundColor: settings.bgColor,
  textAlign: settings.alignment,
  padding: `${settings.padding.top}px ${settings.padding.right}px ${settings.padding.bottom}px ${settings.padding.left}px`,
  position: "relative",
  zIndex: 10,
});

const formatTime = (timeInSeconds) => {
  if (timeInSeconds == null || timeInSeconds < 0) return "00  00";
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}  ${seconds
    .toString()
    .padStart(2, "0")}`;
};

const getComponent = (name) => {
  const components = {
    Background,
    Headline,
    Subheadline,
    Timertext,
    Prewebinar,
    Countdown,
  };
  return components[name] || null;
};

const getSettings = (name) => componentSettings.value[name] || {};

const updateSettings = (name, newSettings) => {
  componentSettings.value[name] = {
    ...componentSettings.value[name],
    ...newSettings,
  };
};

const prewebinarSettings = computed(
  () => componentSettings.value.Prewebinar || {}
);
const mediaElement = ref(null);
const isPlaying = ref(false);

const togglePlay = () => {
  if (isPlaying.value) {
    mediaElement.value.pause();
  } else {
    mediaElement.value.play();
  }
  isPlaying.value = !isPlaying.value;
};

const stopMedia = () => {
  mediaElement.value.pause();
  mediaElement.value.currentTime = 0;
  isPlaying.value = false;
};

watch(
  () => prewebinarSettings.value.mediaFile,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      stopMedia();
      if (mediaElement.value) {
        mediaElement.value.load();
      }
    }
  }
);

onUnmounted(() => {
  stopMedia();
});

const toggleSettings = (component) => {
  activeComponent.value = component;
  dynamicComponent.value = getComponent(component);
};

const backToSidebar = () => {
  activeComponent.value = null;
  dynamicComponent.value = null;
};

onMounted(() => {
  if (countdownSettings.value.time > 0) {
    countdownInterval.value = setInterval(() => {
      componentSettings.value.Countdown.time--;
      if (componentSettings.value.Countdown.time <= 0) {
        clearInterval(countdownInterval.value);
      }
    }, 1000);
  }
});

onUnmounted(() => {
  if (countdownInterval.value) {
    clearInterval(countdownInterval.value);
  }
});
</script>
<style>
body {
  background-color: black;
}
</style>
