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
      <div
        class="min-h-[770px] m-4 rounded-xl bg-zinc-950 p-4"
        id="screen"
        :settings="headlineSettings"
        @updateSettings="updateHeadlineSettings"
      >
        <p :style="headlineStyle">{{ headlineText }}</p>
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
            class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-left"
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
            class="flex overflow-hidden mt-10 text-gray-200 border-b-2 border-zinc-600 py-2 font-bold"
            @click="toggleSettings('Background')"
          >
            Background
          </p>
          <p
            class="flex overflow-hidden mt-4 text-gray-200 border-b-2 border-zinc-600 py-2 font-bold"
            @click="toggleSettings('Headline')"
          >
            Headline
          </p>
          <p
            class="flex overflow-hidden mt-4 text-gray-200 border-b-2 border-zinc-600 py-2 font-bold"
            @click="toggleSettings('Subheadline')"
          >
            Sub Headline
          </p>
          <p
            class="flex overflow-hidden mt-4 text-gray-200 border-b-2 border-zinc-600 py-2 font-bold"
            @click="toggleSettings('Timertext')"
          >
            Timer Text
          </p>
          <p
            class="flex overflow-hidden mt-4 text-gray-200 border-b-2 border-zinc-600 py-2 font-bold"
            @click="toggleSettings('Prewebinar')"
          >
            Pre-Webinar Media
          </p>
          <p
            class="flex overflow-hidden mt-4 text-gray-200 border-b-2 border-zinc-600 py-2 font-bold"
            @click="toggleSettings('Countdown')"
          >
            Countdown Timer
          </p>
        </div>

        <div v-if="activeComponent">
          <component
            :is="dynamicComponent"
            :settings="headlineSettings"
            :key="activeComponent"
            @updateHeadlineText="updateHeadlineText"
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
import { ref, computed, watch } from "vue";
import Background from "@/components/background.vue";
import Headline from "@/components/headline.vue";
import Subheadline from "@/components/subheadline.vue";
import Timertext from "@/components/timertext.vue";
import Prewebinar from "@/components/prewebinar.vue";
import Countdown from "@/components/countdown.vue";

const activeComponent = ref(null);
const dynamicComponent = ref(null);

const headlineText = ref("This is your Opening Room Headline");

const headlineSettings = ref({
  text: headlineText.value,
  fontFamily: "Arial",
  fontWeight: "Normal",
  fontSize: 34,
  fontColor: "#FFFFFF",
  bgColor: "#000000",
  alignment: "center",
  padding: { top: 10, right: 10, bottom: 10, left: 10 },
});

const headlineStyle = computed(() => ({
  fontFamily: headlineSettings.value.fontFamily,
  fontWeight: headlineSettings.value.fontWeight,
  fontSize: `${headlineSettings.value.fontSize}px`,
  color: headlineSettings.value.fontColor,
  backgroundColor: headlineSettings.value.bgColor,
  textAlign: headlineSettings.value.alignment,
  padding: `${headlineSettings.value.padding.top}px ${headlineSettings.value.padding.right}px ${headlineSettings.value.padding.bottom}px ${headlineSettings.value.padding.left}px`,
}));

const updateHeadlineSettings = (newSettings) => {
  headlineSettings.value = { ...headlineSettings.value, ...newSettings };
};

const updateHeadlineText = (newText) => {
  headlineText.value = newText;
};

const toggleSettings = (component) => {
  if (component === "Background") {
    activeComponent.value = component;
    dynamicComponent.value = Background;
  } else if (component === "Headline") {
    activeComponent.value = component;
    dynamicComponent.value = Headline;
  } else if (component === "Subheadline") {
    activeComponent.value = component;
    dynamicComponent.value = Subheadline;
  } else if (component === "Timertext") {
    activeComponent.value = component;
    dynamicComponent.value = Timertext;
  } else if (component === "Prewebinar") {
    activeComponent.value = component;
    dynamicComponent.value = Prewebinar;
  } else if (component === "Countdown") {
    activeComponent.value = component;
    dynamicComponent.value = Countdown;
  }
};
const backToSidebar = () => {
  activeComponent.value = null;
  dynamicComponent.value = null;
};
</script>
