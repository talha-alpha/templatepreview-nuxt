<template>
  <div
    class="flex flex-col min-h-[600px] min-w-[200px] p-4 lg:min-h-[700px] lg:min-w-[220px] lg:p-2 rounded-xl text-sm mr-4"
  >
    <h2 class="text-lg font-bold mb-6">Edit Headline Settings</h2>

    <ModulesTextAreaInput
      class="mb-1"
      label="Text"
      :modelValue="localSettings.text"
      @update:modelValue="handleTextUpdate"
      placeholder="This is your Opening Room Headline"
    />

    <div class="mb-4">
      <label class="flex overflow-hidden font-bold mb-1">Align</label>
      <ModulesAlignmentSelector
        :modelValue="localSettings.alignment"
        @update:modelValue="(v) => updateSetting('alignment', v)"
        :options="alignmentOptions"
      />
    </div>

    <ModulesSelectInput
      class="mb-4"
      label="Font Family"
      :modelValue="localSettings.fontFamily"
      @update:modelValue="(v) => updateSetting('fontFamily', v)"
      :options="fontOptions"
    />

    <ModulesSelectInput
      class="mb-4"
      label="Font Weight"
      :modelValue="localSettings.fontWeight"
      @update:modelValue="(v) => updateSetting('fontWeight', v)"
      :options="fontWeightOptions"
    />

    <ModulesNumberInput
      class="mb-4"
      label="Font Size"
      :modelValue="localSettings.fontSize"
      @update:modelValue="(v) => updateSetting('fontSize', v)"
    />

    <div class="mb-4">
      <label class="flex items-center gap-2 w-full">Font Color</label>
      <ModulesColorPicker
        :modelValue="localSettings.fontColor"
        @update:modelValue="(v) => updateSetting('fontColor', v)"
      />
    </div>

    <div class="mb-4">
      <div class="flex justify-between">
        <label class="flex items-center gap-2 w-full">BG Color</label>
        <ModulesButton
          variant="ghost"
          class="text-destructive hover:text-destructive cursor-pointer text-red-500 font-semibold"
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

    <ModulesPaddingControl
      :padding="localSettings.padding"
      @update:padding="(v) => updateSetting('padding', v)"
    />

    <button
      class="w-full bg-blue-500 hover:bg-blue-400 text-white p-2 font-bold rounded-lg mt-4"
      @click="emitUpdate"
    >
      Update Settings
    </button>
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

const localSettings = ref({ ...props.settings });

const handleTextUpdate = (newText) => {
  localSettings.value.text = newText;
  emit("updateText", newText);
};

watch(
  localSettings,
  (newSettings) => {
    emit("update", newSettings);
  },
  { deep: true }
);

const updateSetting = (key, value) => {
  localSettings.value[key] = value;
  emit("update", { ...localSettings.value });
};

const emitUpdate = () => {
  emit("update", { ...localSettings.value });
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
const fontWeightOptions = ["Normal", "Bold"];
</script>
