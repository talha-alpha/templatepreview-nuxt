<template>
  <div class="flex flex-col min-h-[600px] min-w-[200px] p-4 rounded-xl text-sm">
    <h2 class="text-lg font-bold mb-6">Edit Headline settings</h2>

    <div class="flex-col mb-4 overflow-hidden">
      <Label class="flex overflow-hidden font-bold">Text</Label>
      <Textarea
        v-model="styles.text"
        @keyup="updateText"
        placeholder="This is your Opening Room Headline"
        class="w-full bg-zinc-800 flex overflow-hidden p-2 rounded-lg outline-none text-sm border-zinc-600 border-2"
      />
    </div>

    <div class="flex-col mb-4 overflow-hidden">
      <Label class="flex overflow-hidden font-bold">Align</Label>
      <div
        class="flex justify-around px-2 bg-zinc-800 rounded-lg border-zinc-600 border-2"
      >
        <button
          class="p-2 hover:bg-zinc-900 rounded-lg"
          v-for="{ icon, value } in alignmentOptions"
          :key="value"
          :class="['button', { default: styles.alignment === value }]"
          @click="updateAlignment(value)"
          v-html="icon"
        />
      </div>
    </div>

    <div class="mb-4">
      <Label class="flex overflow-hidden font-bold">Font Family</Label>
      <select
        v-model="styles.fontFamily"
        class="w-full rounded-lg bg-zinc-800 p-2 outline-none border-zinc-600 border-2"
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

    <div class="mb-4">
      <Label class="flex overflow-hidden font-bold">Padding</Label>
      <div class="grid grid-cols-2 gap-2">
        <div
          v-for="{ label, key } in paddingOptions"
          :key="key"
          class="flex gap-2 items-center bg-zinc-800 justify-between rounded-lg outline-none text-center border-zinc-600 border-2"
        >
          <Label class="w-10 p-2 text-center text-sm">{{ label }}</Label>
          <Input
            type="number"
            v-model.number="styles.padding[key]"
            class="w-20 p-2 bg-zinc-900 rounded-r-lg outline-none text-center"
            placeholder="0"
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
import { ref, defineProps, defineEmits, watch } from "vue";

const props = defineProps({
  settings: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["updateHeadlineText"]);

const styles = ref({
  text: props.settings?.text || "Headline Text",
  fontFamily: props.settings?.fontFamily || "Arial",
  fontWeight: props.settings?.fontWeight || "Normal",
  fontSize: props.settings?.fontSize || 32,
  fontColor: props.settings?.fontColor || "#FFFFFF",
  bgColor: props.settings?.bgColor || "#000000",
  alignment: props.settings?.alignment || "left",
  padding: props.settings?.padding || {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10,
  },
});

watch(
  () => styles.value.text,
  (newText) => {
    emit("updateHeadlineText", newText);
  }
);

const updateSettings = () => {
  console.log("Settings updated:", styles.value);
};

const alignmentOptions = [
  {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-align-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 6l16 0" /><path d="M4 12l10 0" /><path d="M4 18l14 0" /></svg>',
    value: "left",
  },
  {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-align-center"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 6l16 0" /><path d="M8 12l8 0" /><path d="M6 18l12 0" /></svg>',
    value: "center",
  },
  {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-align-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 6l16 0" /><path d="M10 12l10 0" /><path d="M6 18l14 0" /></svg>',
    value: "right",
  },
  {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-align-justified"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 6l16 0" /><path d="M4 12l16 0" /><path d="M4 18l12 0" /></svg>',
    value: "justify",
  },
];

const fontOptions = ["Arial", "Cambria", "Courier New", "Cursive", "Fantasy"];
const fontWeight = ["Normal", "Bold"];

const paddingOptions = [
  { label: "Top", key: "top" },
  { label: "Right", key: "right" },
  { label: "Bottom", key: "bottom" },
  { label: "Left", key: "left" },
];
</script>
