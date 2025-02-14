<!-- NumberInput.vue -->
<template>
    <div>
      <label class="flex overflow-hidden font-bold mb-1">{{ label }}</label>
      <input
        type="number"
        v-model.number="value"
        :min="min"
        :max="max"
        class="w-full bg-zinc-800 p-2 rounded-lg outline-none border-zinc-600 border-2"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from "vue";
  const props = defineProps({
    label: { type: String, required: true },
    modelValue: { type: Number, default: 0 },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
  });
  const emit = defineEmits(["update:modelValue"]);
  const value = ref(props.modelValue);
  watch(value, (val) => {
    emit("update:modelValue", val);
  });
  </script>
  