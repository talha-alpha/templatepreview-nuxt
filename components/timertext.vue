<template>
  <div
    class="flex flex-col min-h-[600px] min-w-[200px] p-4 md:min-h-[700px] md:min-w-[220px] md:p-2 rounded-xl text-sm"
  >
    <h2 class="text-lg font-bold mb-6">Edit Timer Text settings</h2>

    <div class="flex-col mb-4 overflow-hidden">
      <ModulesLabel class="flex overflow-hidden font-bold"></ModulesLabel>
      <ModulesTextAreaInput
        :modelValue="localSettings.text"
        @update:modelValue="handleTextUpdate"
        placeholder="Starting in"
      />
    </div>

    <div class="flex-col mb-4 overflow-hidden">
      <ModulesLabel class="flex overflow-hidden font-bold">Align</ModulesLabel>
      <ModulesAlignmentSelector
        :modelValue="localSettings.alignment"
        @update:modelValue="(v) => updateSetting('alignment', v)"
        :options="alignmentOptions"
      />
    </div>

    <div class="mb-4">
      <ModulesLabel class="flex overflow-hidden font-bold"
        >Font Family</ModulesLabel
      >
      <ModulesSelectInput
        :modelValue="localSettings.fontFamily"
        @update:modelValue="(v) => updateSetting('fontFamily', v)"
        :options="fontOptions"
      />
    </div>

    <div class="mb-4">
      <ModulesLabel class="flex overflow-hidden font-bold"
        >Font Weight</ModulesLabel
      >
      <ModulesSelectInput
        :modelValue="localSettings.fontWeight"
        @update:modelValue="(v) => updateSetting('fontWeight', v)"
        :options="fontWeight"
      />
    </div>

    <div class="mb-4">
      <ModulesLabel class="flex overflow-hidden font-bold"
        >Font Size</ModulesLabel
      >
      <ModulesNumberInput
        :modelValue="localSettings.fontSize"
        @update:modelValue="(v) => updateSetting('fontSize', v)"
        :min="8"
        :max="100"
      />
    </div>

    <div class="mb-4">
      <ModulesLabel class="flex overflow-hidden font-bold"
        >Font Color</ModulesLabel
      >
      <ModulesColorPicker
        :modelValue="localSettings.fontColor"
        @update:modelValue="(v) => updateSetting('fontColor', v)"
      />
    </div>

    <div class="mb-4">
      <div class="flex justify-between">
        <ModulesLabel class="flex overflow-hidden font-bold"
          >BG Color</ModulesLabel
        >
        <ModulesButton
          variant="ghost"
          class="text-destructive hover:text-destructive"
          @click="updateSetting('bgColor', 'transparent')"
        >
          Remove
        </ModulesButton>
      </div>
      <ModulesColorPicker
        :modelValue="localSettings.bgColor"
        @update:modelValue="(v) => updateSetting('bgColor', v)"
      />
    </div>

    <div class="mb-4">
      <ModulesLabel class="flex overflow-hidden font-bold"></ModulesLabel>
      <ModulesPaddingControl
        :padding="localSettings.padding"
        @update:padding="(v) => updateSetting('padding', v)"
      />
    </div>

    <ModulesButton
      class="w-full bg-blue-500 hover:bg-blue-600 text-white p-4 font-bold rounded-lg text-center"
      @click="updateSettings"
    >
      Update Settings
    </ModulesButton>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const emit = defineEmits(["update", "updateText"]);
const props = defineProps({
  settings: {
    type: Object,
    required: true,
  },
});

const localSettings = ref({
  text: "Headline Text",
  fontFamily: "Arial",
  fontWeight: "Normal",
  fontSize: 32,
  fontColor: "#FFFFFF",
  bgColor: "#000000",
  alignment: "left",
  padding: { top: 10, right: 10, bottom: 10, left: 10 },
  ...props.settings,
});

watch(
  () => props.settings,
  (newSettings) => {
    localSettings.value = { ...localSettings.value, ...newSettings };
  },
  { deep: true }
);

watch(
  localSettings,
  (newSettings) => {
    emit("update", newSettings);
  },
  { deep: true }
);

const handleTextUpdate = (newText) => {
  localSettings.value.text = newText;
  emit("updateText", newText);
};

const updateSetting = (key, value) => {
  localSettings.value[key] = value;
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
