<template>
  <div
    class="flex flex-col min-h-[550px] min-w-[230px] p-2 rounded-xl bg-background text-sm mb-2 mt-4"
  >
    <h4 class="text-lg font-bold mb-2">Background Type</h4>

    <select
      class="w-full bg-zinc-800 p-2 rounded-lg outline-none border-zinc-600 border-2 mb-4"
    >
      <option value="bg">Color</option>
      <option value="bg">Image</option>
    </select>

    <div class="mb-4">
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
          v-model="settings['bgColor']"
          class="w-10 h-10 rounded cursor-pointer bg-zinc-900"
          placeholder="#000000"
        />
        <div
          class="flex overflow-hidden justify-between border-zinc-600 border-2 rounded-lg"
        >
          <p class="flex overflow-hidden text-center mx-4 p-2">HEX</p>
          <Input
            v-model="settings['bgColor']"
            class="font-mono p-2 bg-zinc-800 outline-none text-center"
            placeholder="#000000"
          />
        </div>
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
import { ref } from "vue";

const Color = ref();
const Image = ref();

const props = defineProps({
  settings: {
    type: Object,
    required: true,
  },
});

const styles = ref(props.settings);
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
