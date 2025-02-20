<template>
  <div
    class="flex flex-col min-h-[600px] min-w-[200px] p-4 lg:min-h-[700px] lg:min-w-[220px] lg:p-2 rounded-xl text-sm mr-4"
  >
    <h2 class="text-lg font-bold mb-6">Edit {{ title }} Settings</h2>

    <ModulesTextAreaInput
      class="mb-1"
      label="Text"
      :modelValue="localSettings.text"
      @update:modelValue="handleTextUpdate"
      placeholder="This is your Sub Headline"
    />

    <div class="mb-4">
      <label class="flex overflow-hidden font-bold mb-1">Align</label>
      <ModulesAlignmentSelector
        v-model="localSettings.alignment"
        :options="alignmentOptions"
      />
    </div>

    <ModulesSelectInput
      class="mb-4"
      label="Font Family"
      v-model="localSettings.fontFamily"
      :options="fontOptions"
    />

    <ModulesSelectInput
      class="mb-4"
      label="Font Weight"
      v-model="localSettings.fontWeight"
      :options="fontWeightOptions"
    />

    <ModulesNumberInput
      class="mb-4"
      label="Font Size"
      v-model="localSettings.fontSize"
      :min="1"
      :max="3"
    />

    <div class="mb-4">
      <label class="flex overflow-hidden font-bold">Font Color</label>
      <ModulesColorPicker v-model="localSettings.fontColor" />
    </div>

    <div class="mb-4">
      <div class="flex justify-between">
        <label class="flex overflow-hidden font-bold">BG Color</label>
        <ModulesButton
          variant="ghost"
          class="text-destructive hover:text-destructive cursor-pointer text-red-500 font-semibold"
          @click="resetBgColor"
        >
          Remove
        </ModulesButton>
      </div>
      <ModulesColorPicker v-model="localSettings.bgColor" />
    </div>

    <ModulesPaddingControl
      :padding="localSettings.padding"
      @update:padding="(newPadding) => (localSettings.padding = newPadding)"
    />

    <button
      class="w-full bg-blue-500 hover:bg-blue-400 text-white p-2 font-bold rounded-lg mt-4"
      @click="updateSettings"
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

const localText = ref(props.settings.text || "This is your Sub Headline");

const title = computed(() => "Sub Headline");
const placeholderText = computed(() => "Enter your Sub Headline text here");

watch(localSettings, (newSettings) => emit("update", newSettings), {
  deep: true,
});
watch(localText, (newText) => emit("updateText", newText));

const resetBgColor = () => {
  localSettings.value.bgColor = "transparent";
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
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icon-tabler-align-center self-center"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 6l16 0" /><path d="M8 12l8 0" /><path d="M6 18l12 0" /></svg>',
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
