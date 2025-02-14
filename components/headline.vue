<template>
  <div class="flex flex-col min-h-[600px] min-w-[200px] p-4 rounded-xl text-sm">
    <h2 class="text-lg font-bold mb-6">Edit Headline Settings</h2>
    <!-- Headline Text -->
    <TextAreaInput
      label="Text"
      v-model="localHeadlineText"
      placeholder="This is your Opening Room Headline"
    />
    <!-- Alignment -->
    <div class="mb-4">
      <label class="flex overflow-hidden font-bold mb-1">Align</label>
      <AlignmentSelector
        v-model="localSettings.alignment"
        :options="alignmentOptions"
      />
    </div>
    <!-- Font Family -->
    <SelectInput
      label="Font Family"
      v-model="localSettings.fontFamily"
      :options="fontOptions"
    />
    <!-- Font Weight -->
    <SelectInput
      label="Font Weight"
      v-model="localSettings.fontWeight"
      :options="fontWeight"
    />
    <!-- Font Size -->
    <NumberInput
      label="Font Size"
      v-model="localSettings.fontSize"
      :min="8"
      :max="100"
    />
    <!-- Font Color -->
    <div class="mb-4">
      <label class="flex overflow-hidden font-bold mb-1">Font Color</label>
      <ColorPicker v-model="localSettings.fontColor" />
    </div>
    <!-- Background Color -->
    <div class="mb-4">
      <div class="flex justify-between">
        <label class="flex overflow-hidden font-bold mb-1">BG Color</label>
        <Button
          variant="ghost"
          class="text-destructive hover:text-destructive"
          @click="handleColorChange('bgColor', 'transparent')"
        >
          Remove
        </Button>
      </div>
      <ColorPicker v-model="localSettings.bgColor" />
    </div>
    <!-- Padding -->
    <PaddingControl
      :padding="localSettings.padding"
      @update:padding="(newPadding) => (localSettings.padding = newPadding)"
    />
    <button
      class="w-full bg-blue-500 hover:bg-blue-600 text-white p-4 font-bold rounded-lg mt-4"
      @click="updateSettings"
    >
      Update Settings
    </button>
  </div>
</template>
<script setup>
import { ref, watch } from "vue";
import AlignmentSelector from "./AlignmentSelector.vue";
import SelectInput from "./SelectInput.vue";
import NumberInput from "./NumberInput.vue";
import ColorPicker from "./ColorPicker.vue";
import PaddingControl from "./PaddingControl.vue";
import TextAreaInput from "./TextAreaInput.vue";
const emit = defineEmits(["update", "updateHeadlineText"]);
const props = defineProps({
  settings: {
    type: Object,
    required: true,
  },
});
const localSettings = ref({ ...props.settings });
const localHeadlineText = ref(
  props.settings.text || "This is your Opening Room Headline"
);
watch(
  localSettings,
  (newSettings) => {
    emit("update", newSettings);
  },
  { deep: true }
);
watch(localHeadlineText, (newText) => {
  emit("updateHeadlineText", newText);
});
const handleColorChange = (key, value) => {
  localSettings.value[key] = value;
};
const updateSettings = () => {
  emit("update", localSettings.value);
};
const alignmentOptions = [
  {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icon-tabler-align-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 6l16 0" /><path d="M4 12l10 0" /><path d="M4 18l14 0" /></svg>',
    value: "left",
  },
  {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icon-tabler-align-center"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 6l16 0" /><path d="M8 12l8 0" /><path d="M6 18l12 0" /></svg>',
    value: "center",
  },
  {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icon-tabler-align-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 6l16 0" /><path d="M10 12l10 0" /><path d="M6 18l14 0" /></svg>',
    value: "right",
  },
  {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icon-tabler-align-justified"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 6l16 0" /><path d="M4 12l16 0" /><path d="M4 18l12 0" /></svg>',
    value: "justify",
  },
];
const fontOptions = ["Arial", "Cambria", "Courier New", "Cursive", "Fantasy"];
const fontWeight = ["Normal", "Bold"];
</script>
