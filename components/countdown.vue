<template>
  <div
    class="flex flex-col min-h-[700px] min-w-[300px] p-4 lg:min-h-[700px] lg:min-w-[220px] lg:p-2 rounded-xl bg-background text-sm mr-4"
  >
    <h2 class="text-lg font-bold mb-4">Set Duration</h2>

    <div class="mr-2">
      <ModulesLabel class="flex overflow-hidden font-bold mb-2">
        Duration (Minutes)
      </ModulesLabel>
      <ModulesNumberInput
        :modelValue="localSettings.duration"
        @update:modelValue="(v) => updateSetting('duration', v)"
        :min="1"
        :max="2"
        placeholder="Max 30"
        class="w-full text-white rounded-lg outline-none"
      />
      <p class="mb-8 mt-1 text-sm justify-start">Max 30 minutes</p>
    </div>

    <h2 class="text-lg font-bold mb-2">Edit Settings</h2>

    <div class="mb-4 mr-2">
      <ModulesLabel class="flex overflow-hidden font-bold">
        Choose Element To Adjust
      </ModulesLabel>
      <ModulesSelectInput
        :modelValue="localSettings.selectedElement || 'Select Element'"
        @update:modelValue="updateSelectedElement"
        :options="elementOptions"
      />
    </div>

    <div
      v-if="localSettings.selectedElement === 'Period Settings'"
      class="mr-1"
    >
      <h3 class="text-lg font-bold mb-4">Period Settings</h3>
      <div class="mb-4">
        <ModulesLabel class="flex overflow-hidden font-bold">
          Period Font Family
        </ModulesLabel>
        <ModulesSelectInput
          :modelValue="localSettings.period.fontFamily"
          @update:modelValue="(v) => updatePeriodSetting('fontFamily', v)"
          :options="fontOptions"
          placeholder="Arial"
        />
      </div>
      <div class="mb-4">
        <ModulesLabel class="flex overflow-hidden font-bold">
          Period Font Weight
        </ModulesLabel>
        <ModulesSelectInput
          :modelValue="localSettings.period.fontWeight"
          @update:modelValue="(v) => updatePeriodSetting('fontWeight', v)"
          :options="fontWeightOptions"
          placeholder="Normal"
        />
      </div>
      <div class="mb-4">
        <ModulesLabel class="flex overflow-hidden font-bold">
          Period Font Size
        </ModulesLabel>
        <ModulesNumberInput
          :modelValue="localSettings.period.fontSize"
          @update:modelValue="(v) => updatePeriodSetting('fontSize', v)"
          :min="8"
          :max="100"
          placeholder="32"
        />
      </div>
      <div class="mb-4">
        <ModulesLabel class="flex overflow-hidden font-bold">
          Period Font Color
        </ModulesLabel>
        <ModulesColorPicker
          :modelValue="localSettings.period.fontColor"
          @update:modelValue="(v) => updatePeriodSetting('fontColor', v)"
        />
      </div>
      <div class="mb-4">
        <div class="flex justify-between">
          <label class="flex overflow-hidden font-bold"> BG Color </label>
          <ModulesButton
            variant="ghost"
            class="text-destructive hover:text-destructive cursor-pointer"
            @click="resetBgColor"
          >
            Remove
          </ModulesButton>
        </div>
        <ModulesColorPicker
          :modelValue="localSettings.period.bgColor"
          @update:modelValue="(v) => updatePeriodSetting('bgColor', v)"
        />
      </div>
    </div>

    <div
      v-else-if="localSettings.selectedElement === 'Timer Settings'"
      class="mr-2"
    >
      <h3 class="text-lg font-bold mb-4">Timer Settings</h3>
      <div class="mb-4">
        <ModulesLabel class="flex overflow-hidden font-bold">
          Timer Font Family
        </ModulesLabel>
        <ModulesSelectInput
          :modelValue="localSettings.timer.fontFamily"
          @update:modelValue="(v) => updateTimerSetting('fontFamily', v)"
          :options="fontOptions"
          placeholder="Arial"
        />
      </div>
      <div class="mb-4">
        <ModulesLabel class="flex overflow-hidden font-bold">
          Timer Font Weight
        </ModulesLabel>
        <ModulesSelectInput
          :modelValue="localSettings.timer.fontWeight"
          @update:modelValue="(v) => updateTimerSetting('fontWeight', v)"
          :options="fontWeightOptions"
          placeholder="Normal"
        />
      </div>
      <div class="mb-4">
        <ModulesLabel class="flex overflow-hidden font-bold">
          Timer Font Size
        </ModulesLabel>
        <ModulesNumberInput
          :modelValue="localSettings.timer.fontSize"
          @update:modelValue="(v) => updateTimerSetting('fontSize', v)"
          :min="8"
          :max="100"
          placeholder="32"
        />
      </div>
      <div class="mb-4">
        <ModulesLabel class="flex overflow-hidden font-bold">
          Timer Font Color
        </ModulesLabel>
        <ModulesColorPicker
          :modelValue="localSettings.timer.fontColor"
          @update:modelValue="(v) => updateTimerSetting('fontColor', v)"
        />
      </div>
      <div class="mb-4">
        <div class="flex justify-between">
          <label class="flex overflow-hidden font-bold"> BG Color </label>
          <ModulesButton
            variant="ghost"
            class="text-destructive hover:text-destructive cursor-pointer"
            @click="resetBgColor"
          >
            Remove
          </ModulesButton>
        </div>
        <ModulesColorPicker
          :modelValue="localSettings.period.bgColor"
          @update:modelValue="(v) => updateTimerSetting('bgColor', v)"
        />
      </div>
    </div>

    <ModulesButton
      class="w-full bg-blue-500 hover:bg-blue-400 text-white p-2 font-bold rounded-lg text-center"
      @click="emitUpdate"
    >
      Update Settings
    </ModulesButton>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const emit = defineEmits(["update"]);
const props = defineProps({
  settings: {
    type: Object,
    required: true,
  },
});

const localSettings = ref({
  duration: props.settings.duration || 1,
  selectedElement: props.settings.selectedElement || "Select Element",
  period: {
    fontFamily: props.settings.period?.fontFamily || "Arial",
    fontWeight: props.settings.period?.fontWeight || "Normal",
    fontSize: props.settings.period?.fontSize || 32,
    fontColor: props.settings.period?.fontColor || "#FFFFFF",
    bgColor: props.settings.period?.bgColor || "transparent",
  },
  timer: {
    fontFamily: props.settings.timer?.fontFamily || "Arial",
    fontWeight: props.settings.timer?.fontWeight || "Normal",
    fontSize: props.settings.timer?.fontSize || 32,
    fontColor: props.settings.timer?.fontColor || "#FFFFFF",
    bgColor: props.settings.timer?.bgColor || "transparent",
  },
});

// Options for the select input
const elementOptions = ["Period Settings", "Timer Settings"];
const fontOptions = ["Arial", "Cambria", "Courier New", "Cursive", "Fantasy"];
const fontWeightOptions = ["Normal", "Bold"];

// Helper: emit updated settings to parent
const emitUpdate = () => {
  emit("update", { ...localSettings.value });
};

// Generic update function (for properties like duration)
const updateSetting = (key, value) => {
  localSettings.value[key] = value;
  emitUpdate();
};

// Update period settings
const updatePeriodSetting = (key, value) => {
  localSettings.value.period[key] = value;
  console.log(`Updated period setting: ${key} = ${value}`);
  emitUpdate();
};

// Update timer settings
const updateTimerSetting = (key, value) => {
  localSettings.value.timer[key] = value;
  console.log(`Updated timer setting: ${key} = ${value}`);
  emitUpdate();
};

// Update the selected element
const updateSelectedElement = (value) => {
  localSettings.value.selectedElement = value;
  emitUpdate();
};

// Reset BG Color for the currently active element
const resetBgColor = () => {
  if (localSettings.value.selectedElement === "Period Settings") {
    localSettings.value.period.bgColor = "transparent";
    console.log("Reset Period BG Color to transparent");
  } else if (localSettings.value.selectedElement === "Timer Settings") {
    localSettings.value.timer.bgColor = "transparent";
    console.log("Reset Timer BG Color to transparent");
  }
  emitUpdate();
};

// Watch for prop changes and update local state (deep merge)
watch(
  () => props.settings,
  (newSettings) => {
    localSettings.value.duration =
      newSettings.duration || localSettings.value.duration;
    localSettings.value.selectedElement =
      newSettings.selectedElement || localSettings.value.selectedElement;
    localSettings.value.period = {
      ...localSettings.value.period,
      ...newSettings.period,
    };
    localSettings.value.timer = {
      ...localSettings.value.timer,
      ...newSettings.timer,
    };
  },
  { deep: true }
);

// Ensure the selected element remains valid
watch(
  () => localSettings.value.selectedElement,
  (newElement) => {
    if (!elementOptions.includes(newElement)) {
      localSettings.value.selectedElement = "Period Settings"; // fallback
    }
  }
);
</script>
