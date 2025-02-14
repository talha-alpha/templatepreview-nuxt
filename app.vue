<template>
  <div
    class="min-h-[800px] max-w-[1500px] text-white flex overflow-hidden m-[150px] mt-[30px] rounded-xl bg-zinc-900 border-black border-2"
  >
    <div
      class="flex-col overflow-hidden min-h-[750px] min-w-[1100px] justify-start bg-zinc-800 m-4 p-4 rounded-xl"
    >
      <strong
        class="text-gray-200 flex font-extrabold p-2 border-b-2 border-zinc-600 self-center"
      >
        Template Preview
      </strong>
      <div class="min-h-[770px] m-4 rounded-xl bg-zinc-950" id="screen">
        <p :style="headlineStyle">{{ headlineSettings.text }}</p>
        <p :style="subheadlineStyle">{{ subheadlineSettings.text }}</p>
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
            class="flex overflow-hidden mt-4 text-gray-200 border-b-2 border-zinc-600 py-2 font-bold"
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
            @updateText="updateText(activeComponent, $event)"
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
import { ref, computed } from "vue";
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

const componentSettings = ref({
  Headline: {
    text: "This is your Headline",
    alignment: "center",
    fontFamily: "Arial",
    fontWeight: "Bold",
    fontSize: 24,
    fontColor: "#000000",
    bgColor: "transparent",
    padding: { top: 10, right: 10, bottom: 10, left: 10 },
  },
  Subheadline: {
    text: "This is your subheadline",
    alignment: "left",
    fontFamily: "Cambria",
    fontWeight: "Normal",
    fontSize: 18,
    fontColor: "#333333",
    bgColor: "transparent",
    padding: { top: 5, right: 5, bottom: 5, left: 5 },
  },
  Timertext: { text: "Timer running...", fontSize: 20, fontColor: "#FF0000" },
  Prewebinar: {
    text: "Webinar starting soon!",
    fontSize: 22,
    fontColor: "#008000",
  },
  Countdown: { time: 60, fontSize: 30, fontColor: "#FF4500" },
  Background: { bgColor: "#F0F0F0", image: "default-bg.jpg" },
});

const headlineSettings = computed(() => componentSettings.value.Headline);
const subheadlineSettings = computed(() => componentSettings.value.Subheadline);

const headlineStyle = computed(() => ({
  fontFamily: headlineSettings.value.fontFamily,
  fontWeight: headlineSettings.value.fontWeight,
  fontSize: `${headlineSettings.value.fontSize}px`,
  color: headlineSettings.value.fontColor,
  backgroundColor: headlineSettings.value.bgColor,
  textAlign: headlineSettings.value.alignment,
  padding: `${headlineSettings.value.padding.top}px ${headlineSettings.value.padding.right}px ${headlineSettings.value.padding.bottom}px ${headlineSettings.value.padding.left}px`,
}));

const subheadlineStyle = computed(() => ({
  fontFamily: subheadlineSettings.value.fontFamily,
  fontWeight: subheadlineSettings.value.fontWeight,
  fontSize: `${subheadlineSettings.value.fontSize}px`,
  color: subheadlineSettings.value.fontColor,
  backgroundColor: subheadlineSettings.value.bgColor,
  textAlign: subheadlineSettings.value.alignment,
  padding: `${subheadlineSettings.value.padding.top}px ${subheadlineSettings.value.padding.right}px ${subheadlineSettings.value.padding.bottom}px ${subheadlineSettings.value.padding.left}px`,
}));

const getComponent = (name) => {
  const components = {
    Headline,
    Subheadline,
    Timertext,
    Prewebinar,
    Countdown,
    Background,
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

const updateText = (name, newText) => {
  if (componentSettings.value[name]) {
    componentSettings.value[name].text = newText;
  }
};

const toggleSettings = (component) => {
  activeComponent.value = component;
  dynamicComponent.value = getComponent(component);
};

const backToSidebar = () => {
  activeComponent.value = null;
  dynamicComponent.value = null;
};
</script>
