<template>
  <div
    class="flex flex-col min-h-[700px] min-w-[300px] p-4 rounded-xl bg-background text-sm"
  >
    <h2 class="text-lg font-bold mb-6">Set Duration</h2>

    <div class="mb-10">
      <label class="flex overflow-hidden font-bold">Duration</label>
      <div class="flex gap-4">
        <input
          type="number"
          class="bg-zinc-800 w-full p-4 text-white rounded-lg outline-none border-zinc-600 border-2"
          placeholder="Max 30"
        />
      </div>
    </div>

    <h2 class="text-lg font-bold mb-6">Edit Settings</h2>
    <div class="mb-4">
      <label class="flex overflow-hidden font-bold"
        >Choose Element To Adjust</label
      >
      <select
        class="w-full bg-zinc-800 p-2 rounded-lg outline-none border-zinc-600 border-2"
      >
        <option class="rounded-lg">Period setting</option>
        <option class="rounded-lg">Timer setting</option>
      </select>
    </div>

    <div class="mb-4">
      <Label class="flex overflow-hidden font-bold">Font Family</Label>
      <select
        v-model="styles.fontFamily"
        class="w-full rounded-lg bg-zinc-800 p-2 outline-none border-zinc-600 border-2"
        placeholder="Arial"
      >
        <option
          v-for="font in fontOptions"
          :key="font"
          :value="font"
          class="rounded-lg"
        >
          {{ font }}
        </option>
      </select>
    </div>

    <div class="mb-4">
      <Label class="flex overflow-hidden font-bold">Font Weight</Label>
      <select
        v-model="styles.fontWeight"
        class="w-full bg-zinc-800 p-2 rounded-lg outline-none border-zinc-600 border-2"
        placeholder="Normal"
      >
        <option
          v-for="font in fontWeight"
          :key="font"
          :value="font"
          class="rounded-lg"
        >
          {{ font }}
        </option>
      </select>
    </div>

    <div class="mb-4">
      <Label class="flex overflow-hidden font-bold">Font Size</Label>
      <div class="flex gap-4">
        <Input
          type="number"
          v-model.number="styles.fontSize"
          min="8"
          max="100"
          step="1"
          class="bg-zinc-800 w-full p-4 text-white rounded-lg outline-none border-zinc-600 border-2"
          placeholder="32"
        />
        <span
          class="flex items-center rounded-lg bg-zinc-800 p-4 border-zinc-600 border-2"
          >PX</span
        >
      </div>
    </div>

    <div class="mb-4">
      <Label class="flex overflow-hidden font-bold">Font Color</Label>
      <div class="flex gap-2 items-center">
        <input
          type="color"
          v-model="styles.fontColor"
          class="w-10 h-10 rounded cursor-pointer bg-zinc-900"
          placeholder="#FFFFFF"
        />
        <div
          class="flex overflow-hidden justify-between border-zinc-600 border-2 rounded-lg"
        >
          <p class="flex overflow-hidden text-center mx-4 p-2">HEX</p>
          <Input
            v-model="styles.fontColor"
            class="font-mono p-2 bg-zinc-800 outline-none text-center"
            placeholder="#FFFFFF"
          />
        </div>
      </div>
    </div>

    <div class="mb-4">
      <div class="flex justify-between">
        <Label class="flex overflow-hidden font-bold">BG Color</Label>
        <Button
          variant="ghost"
          class="text-destructive hover:text-destructive"
          @click="handleColorChange('bgColor', 'transparent')"
        >
          Remove
        </Button>
      </div>
      <div class="flex gap-2 items-center">
        <input
          type="color"
          v-model="styles.bgColor"
          class="w-10 h-10 rounded cursor-pointer bg-zinc-900"
          placeholder="#000000"
        />
        <div
          class="flex overflow-hidden justify-between border-zinc-600 border-2 rounded-lg"
        >
          <p class="flex overflow-hidden text-center mx-4 p-2">HEX</p>
          <Input
            v-model="styles.bgColor"
            class="font-mono p-2 bg-zinc-800 outline-none text-center"
            placeholder="#000000"
          />
        </div>
      </div>
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
import { ref } from "vue";

const props = defineProps({
  settings: {
    type: Object,
    required: true,
  },
});
const styles = ref(props.settings);

const fontOptions = ["Arial", "Cambria", "Courier New", "Cursive", "Fantasy"];
const fontWeight = ["Normal", "Bold"];

const paddingOptions = [
  { label: "Top", key: "top" },
  { label: "Right", key: "right" },
  { label: "Bottom", key: "bottom" },
  { label: "Left", key: "left" },
];

const updateAlignment = (value) => {
  styles.value.alignment = value;
};

const updateSettings = () => {
  console.log("Settings updated:", styles.value);
};

const backToNavbar = () => {
  activeComponent.value = null;
  currentComponent.value = null;
};
</script>
