<template>
  <div
    class="flex flex-col min-h-[550px] min-w-[230px] p-2 rounded-xl bg-background text-sm mb-2 mt-4"
  >
    <h4 class="text-lg font-bold mb-2">Background Type</h4>

    <select
      v-model="backgroundType"
      class="w-full bg-zinc-800 p-2 rounded-lg outline-none border-zinc-600 border-2 mb-4"
    >
      <option value="color">Color</option>
      <option value="image">Image</option>
    </select>

    <div v-if="backgroundType === 'color'" class="mb-4">
      <div class="flex justify-between">
        <Label class="flex overflow-hidden font-bold mb-2">BG Color</Label>
        <Button
          variant="ghost"
          class="text-destructive hover:text-destructive"
          @click="handleColorChange('bgColor', 'transparent')"
        >
          Remove
        </Button>
      </div>
      <div class="flex gap-2 items-center mb-4">
        <input
          type="color"
          v-model="settings.bgColor"
          class="w-10 h-10 rounded cursor-pointer bg-zinc-900"
          placeholder="#000000"
        />
        <div
          class="flex overflow-hidden justify-between border-zinc-600 border-2 rounded-lg"
        >
          <p class="flex overflow-hidden text-center mx-4 p-2">HEX</p>
          <Input
            v-model="settings.bgColor"
            class="font-mono p-2 bg-zinc-800 outline-none text-center"
          />
        </div>
      </div>
    </div>

    <div v-if="backgroundType === 'image'" class="mb-4">
      <Label class="flex overflow-hidden font-bold mb-2">Background Image</Label>
      <div class="flex flex-col gap-2">
        <select
          v-model="selectedImage"
          class="w-full bg-zinc-800 p-2 rounded-lg outline-none border-zinc-600 border-2 mb-2"
        >
          <option value="">Select an image</option>
          <option v-for="image in imageOptions" :key="image.value" :value="image.value">
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

    <Button
      class="bg-blue-500 hover:bg-blue-600 text-white p-4 font-bold rounded-lg"
      @click="updateSettings"
    >
      Update Settings
    </Button>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import bg1 from "./img/bg1.jpg"; 

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
  { label: "Empty Option 1", value: "" }, 
  { label: "Empty Option 2", value: "" }, 
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
</style>