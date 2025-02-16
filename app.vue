<template>
  <div
    class="min-h-[800px] max-w-[1200px] text-white flex overflow-hidden m-[150px] mt-[30px] rounded-xl bg-zinc-900 border-black border-2"
  >
    <div
      class="flex-col overflow-hidden min-h-[750px] min-w-[800px] justify-start bg-zinc-800 m-4 p-4 rounded-xl"
    >
      <strong
        class="text-gray-200 flex font-extrabold p-2 border-b-2 border-zinc-600 self-center"
      >
        Template Preview
      </strong>
      <div
        class="min-h-[770px] rounded-xl bg-zinc-950 m-4"
        id="screen"
        :style="{
          backgroundImage: backgroundSettings.bgImage ? `url(${backgroundSettings.bgImage})` : 'none',
          backgroundColor: backgroundSettings.bgColor,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }"
      >
        <p :style="headlineStyle">{{ headlineSettings.text }}</p>

        <p :style="subheadlineStyle">{{ subheadlineSettings.text }}</p>

        <p :style="timertextStyle">{{ timertextSettings.text }}</p>

        <div class="flex gap-2 justify-center mt-2">
        <div v-if="countdownSettings.time > 0" :style="countdownContainerStyle">
          <span :style="timerTextStyle">{{ formatTime(countdownSettings.time) }}</span>

            <span :style="periodTextStyle" class="p-2 rounded-lg">MIN</span>
            <span :style="periodTextStyle" class="p-2 rounded-lg">SEC</span>
          </div>
        </div>
      </div>
    </div>

    <div id="sidenav" class="p-2 rounded-xl">
      <div
        class="flex-row overflow-hidden min-h-[700px] min-w-[300px] rounded-xl justify-end"
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

        <div v-if="!activeComponent">
          <h2 class="text-lg font-bold my-2 text-gray-200">Template</h2>
          <p
            v-for="comp in activeComponents"
            :key="comp"
            class="flex overflow-hidden mt-4 text-gray-200 border-b-2 border-zinc-600 py-2 font-bold hover:bg-zinc-700 cursor-pointer"
            @click="toggleSettings(comp)"
          >
            {{ comp }}
          </p>
        </div>

        <div>
          <component
            v-if="activeComponents.includes(activeComponent)"
            :is="dynamicComponent"
            :settings="getSettings(activeComponent)"
            :key="activeComponent"
            @update="updateSettings(activeComponent, $event)"
          />
        </div>

        <button
          v-if="!activeComponent"
          class="flex overflow-hidden mt-12 text-gray-200 bg-blue-500 hover:bg-blue-600 justify-center rounded-xl p-4 font-bold w-full"
        >
          Save Settings
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
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
    padding: { top: 30, right: 10, bottom: 10, left: 10 },
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
    time: 180, 
    duration: 3,
    selectedElement: "timer" || "period",
    period: {
      fontFamily: "Arial",
      fontWeight: "Normal",
      fontSize: 28,
      fontColor: "#FFFFFF",
    },
    timer: {
      fontFamily: "Arial",
      fontWeight: "Bold",
      fontSize: 38,
      fontColor: "#FFFFFF",
    },
    bgColor: "transparent",
  },
  Background: { bgColor: "#000108", bgImage: null },
});

const headlineSettings = computed(() => componentSettings.value.Headline);
const subheadlineSettings = computed(() => componentSettings.value.Subheadline);
const timertextSettings = computed(() => componentSettings.value.Timertext);
const countdownSettings = computed(() => componentSettings.value.Countdown);
const backgroundSettings = computed(() => componentSettings.value.Background);

const headlineStyle = computed(() => getTextStyle(headlineSettings.value));
const subheadlineStyle = computed(() => getTextStyle(subheadlineSettings.value));
const timertextStyle = computed(() => getTextStyle(timertextSettings.value));

const timerTextStyle = computed(() => ({
  fontFamily: countdownSettings.value.timer.fontFamily,
  fontWeight: countdownSettings.value.timer.fontWeight,
  fontSize: `${countdownSettings.value.timer.fontSize}px`,
  color: countdownSettings.value.timer.fontColor,
  textAlign: "center",
  display: "block",
}));

const periodTextStyle = computed(() => ({
  fontFamily: countdownSettings.value.period.fontFamily,
  fontWeight: countdownSettings.value.period.fontWeight,
  fontSize: `${countdownSettings.value.period.fontSize}px`,
  color: countdownSettings.value.period.fontColor,
  backgroundColor: countdownSettings.value.bgColor,
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
});

const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
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
    const interval = setInterval(() => {
      componentSettings.value.Countdown.time--;
      if (componentSettings.value.Countdown.time <= 0) {
        clearInterval(interval);
      }
    }, 1000);
  }
});
</script>