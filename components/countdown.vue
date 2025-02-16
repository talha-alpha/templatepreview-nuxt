<template>
  <div class="flex flex-col min-h-[700px] min-w-[300px] p-4 rounded-xl bg-background text-sm">
    <h2 class="text-lg font-bold mb-6">Set Duration</h2>

    <div class="mb-10">
      <Label class="flex overflow-hidden font-bold mb-2">Duration (Minutes)</Label>
      <div class="flex gap-4">
        <NumberInput
          :modelValue="localSettings.duration"
          @update:modelValue="v => updateSetting('duration', v)"
          :min="1"
          :max="30"
          placeholder="Max 30"
          class="bg-zinc-800 w-full p-4 text-white rounded-lg outline-none border-zinc-600 border-2"
        />
        <span
          class="flex items-center rounded-lg bg-zinc-800 p-4 border-zinc-600 border-2"
        >MIN</span>
      </div>
    </div>

    <h2 class="text-lg font-bold mb-6">Edit Settings</h2>

    <div class="mb-4">
      <Label class="flex overflow-hidden font-bold mb-2">Choose Element To Adjust</Label>
      <SelectInput
        :modelValue="localSettings.selectedElement"
        @update:modelValue="v => updateSetting('selectedElement', v)"
        :options="elementOptions"
        placeholder="Select Element"
      />
    </div>

    <template v-if="localSettings.selectedElement === 'period'">
      <div class="mb-4">
        <Label class="flex overflow-hidden font-bold mb-2">Period Font Family</Label>
        <SelectInput
          :modelValue="localSettings.period.fontFamily"
          @update:modelValue="v => updatePeriodSetting('fontFamily', v)"
          :options="fontOptions"
          placeholder="Arial"
        />
      </div>
      <div class="mb-4">
        <Label class="flex overflow-hidden font-bold mb-2">Period Font Weight</Label>
        <SelectInput
          :modelValue="localSettings.period.fontWeight"
          @update:modelValue="v => updatePeriodSetting('fontWeight', v)"
          :options="fontWeight"
          placeholder="Normal"
        />
      </div>
      <div class="mb-4">
        <Label class="flex overflow-hidden font-bold mb-2">Period Font Size</Label>
        <div class="flex gap-4">
          <NumberInput
            :modelValue="localSettings.period.fontSize"
            @update:modelValue="v => updatePeriodSetting('fontSize', v)"
            :min="8"
            :max="100"
            placeholder="32"
            class="bg-zinc-800 w-full p-4 text-white rounded-lg outline-none border-zinc-600 border-2"
          />
          <span
            class="flex items-center rounded-lg bg-zinc-800 p-4 border-zinc-600 border-2"
          >PX</span>
        </div>
      </div>
      <div class="mb-4">
        <Label class="flex overflow-hidden font-bold mb-2">Period Font Color</Label>
        <div class="flex gap-2 items-center">
          <ColorPicker
            :modelValue="localSettings.period.fontColor"
            @update:modelValue="v => updatePeriodSetting('fontColor', v)"
            class="w-10 h-10 rounded cursor-pointer bg-zinc-900"
          />
          <div class="flex overflow-hidden justify-between border-zinc-600 border-2 rounded-lg">
            <p class="flex overflow-hidden text-center mx-4 p-2">HEX</p>
            <Input
              :modelValue="localSettings.period.fontColor"
              @update:modelValue="v => updatePeriodSetting('fontColor', v)"
              class="font-mono p-2 bg-zinc-800 outline-none text-center"
              placeholder="#FFFFFF"
            />
          </div>
        </div>
      </div>
    </template>

    <template v-if="localSettings.selectedElement === 'timer'">
      <div class="mb-4">
        <Label class="flex overflow-hidden font-bold mb-2">Timer Font Family</Label>
        <SelectInput
          :modelValue="localSettings.timer.fontFamily"
          @update:modelValue="v => updateTimerSetting('fontFamily', v)"
          :options="fontOptions"
          placeholder="Arial"
        />
      </div>
      <div class="mb-4">
        <Label class="flex overflow-hidden font-bold mb-2">Timer Font Weight</Label>
        <SelectInput
          :modelValue="localSettings.timer.fontWeight"
          @update:modelValue="v => updateTimerSetting('fontWeight', v)"
          :options="fontWeight"
          placeholder="Normal"
        />
      </div>
      <div class="mb-4">
        <Label class="flex overflow-hidden font-bold mb-2">Timer Font Size</Label>
        <div class="flex gap-4">
          <NumberInput
            :modelValue="localSettings.timer.fontSize"
            @update:modelValue="v => updateTimerSetting('fontSize', v)"
            :min="8"
            :max="100"
            placeholder="32"
            class="bg-zinc-800 w-full p-4 text-white rounded-lg outline-none border-zinc-600 border-2"
          />
          <span
            class="flex items-center rounded-lg bg-zinc-800 p-4 border-zinc-600 border-2"
          >PX</span>
        </div>
      </div>
      <div class="mb-4">
        <Label class="flex overflow-hidden font-bold mb-2">Timer Font Color</Label>
        <div class="flex gap-2 items-center">
          <ColorPicker
            :modelValue="localSettings.timer.fontColor"
            @update:modelValue="v => updateTimerSetting('fontColor', v)"
            class="w-10 h-10 rounded cursor-pointer bg-zinc-900"
          />
          <div class="flex overflow-hidden justify-between border-zinc-600 border-2 rounded-lg">
            <p class="flex overflow-hidden text-center mx-4 p-2">HEX</p>
            <Input
              :modelValue="localSettings.timer.fontColor"
              @update:modelValue="v => updateTimerSetting('fontColor', v)"
              class="font-mono p-2 bg-zinc-800 outline-none text-center"
              placeholder="#FFFFFF"
            />
          </div>
        </div>
      </div>
    </template>

    <Button
      class="w-full bg-blue-500 hover:bg-blue-600 text-white p-4 font-bold rounded-lg"
      @click="emitUpdate"
    >
      Update Settings
    </Button>
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
  ...props.settings,
  duration: 1,
  selectedElement: "",
  period: {
    fontFamily: "Arial",
    fontWeight: "Normal",
    fontSize: 32,
    fontColor: "#FFFFFF",
  },
  timer: {
    fontFamily: "Arial",
    fontWeight: "Normal",
    fontSize: 32,
    fontColor: "#FFFFFF",
  },
});

const elementOptions = [
  { label: "Period Setting", value: "period" },
  { label: "Timer Setting", value: "timer" },
];

const fontOptions = ["Arial", "Cambria", "Courier New", "Cursive", "Fantasy"];
const fontWeight = ["Normal", "Bold"];

const updateSetting = (key, value) => {
  localSettings.value[key] = value;
};

const updatePeriodSetting = (key, value) => {
  localSettings.value.period[key] = value;
};

const updateTimerSetting = (key, value) => {
  localSettings.value.timer[key] = value;
};

const emitUpdate = () => {
  emit("update", { ...localSettings.value });
};

watch(
  () => props.settings,
  (newSettings) => {
    localSettings.value = { ...newSettings };
  },
  { deep: true }
);

watch(
  () => localSettings.value.duration,
  (newDuration) => {
    if (newDuration > 30) {
      localSettings.value.duration = 30;
    } else if (newDuration < 1) {
      localSettings.value.duration = 1;
    }
  }
);
</script>
