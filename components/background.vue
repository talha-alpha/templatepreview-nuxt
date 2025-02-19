<template>
  <div
    class="flex flex-col xl:min-h-[700px] xl:min-w-[300px] p-2 lg:min-h-[700px] lg:min-w-[220px] rounded-xl bg-background text-sm mb-2 mr-4 mt-4"
  >
    <h4 class="text-lg font-bold mb-6">Background Type</h4>
    <div class="relative mb-2">
      <select
        v-model="backgroundType"
        class="w-full appearance-none rounded-lg bg-zinc-800 p-3 pr-10 outline-none border-zinc-600 border-2"
      >
        <option value="color">Color</option>
        <option value="image">Image</option>
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

    <div v-if="backgroundType === 'color'" class="mb-4">
      <div class="flex justify-between">
        <ModulesLabel class="flex overflow-hidden font-bold mb-2"
          >BG Color</ModulesLabel
        >
        <ModulesButton
          variant="ghost"
          class="text-destructive hover:text-destructive cursor-pointer"
          @click="handleColorChange('bgColor', 'transparent')"
        >
          Remove
        </ModulesButton>
      </div>
      <ModulesColorPicker
        :modelValue="settings.bgColor"
        @update:modelValue="(v) => handleColorChange('bgColor', v)"
      />
    </div>

    <div v-if="backgroundType === 'image'" class="mb-4">
      <ModulesLabel class="flex overflow-hidden font-bold mb-2"
        >Background Image</ModulesLabel
      >
      <div class="flex flex-col gap-2">
        <select
          v-model="selectedImage"
          class="w-full bg-zinc-800 p-2 rounded-lg outline-none border-zinc-600 border-2 mb-2"
        >
          <option value="">Select an image</option>
          <option
            v-for="image in imageOptions"
            :key="image.value"
            :value="image.value"
          >
            {{ image.label }}
          </option>
        </select>

        <img
          v-if="selectedImage"
          :src="selectedImage"
          alt="Selected Background"
          class="w-full h-32 object-cover rounded-lg border-zinc-600 border-2 mb-2"
        />
      </div>
    </div>

    <ModulesButton
      class="bg-blue-500 hover:bg-blue-400 text-white p-2 font-bold rounded-lg text-center"
      @click="updateSettings"
    >
      Update Settings
    </ModulesButton>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import bg1 from "./img/bg1.jpg";
import bg2 from "./img/bg2.jpeg";
import bg3 from "./img/bg3.jpeg";

const emit = defineEmits(["update"]);
const props = defineProps({
  settings: {
    type: Object,
    required: true,
  },
});

const backgroundType = ref("color");
const selectedImage = ref("");
const localSettings = ref({ ...props.settings });

const imageOptions = [
  { label: "Image 1", value: bg1 },
  { label: "Image 2", value: bg2 },
  { label: "Image 3", value: bg3 },
];

watch(selectedImage, (newImage) => {
  localSettings.value.bgImage = newImage;
  emit("update", localSettings.value);
});

const handleColorChange = (key, value) => {
  localSettings.value[key] = value;
  emit("update", localSettings.value);
};

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

<style>
input[type="color"] {
  border-radius: 4px;
  padding: 0;
  border: 0px;
  overflow: hidden;
}

input[type="color"]::-moz-color-swatch {
  border: none;
}

input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
  border-radius: 4px;
}

input[type="color"]::-webkit-color-swatch {
  border: none;
}

select {
  appearance: none;
}
</style>
