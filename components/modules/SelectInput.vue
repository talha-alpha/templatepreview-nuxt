<!-- SelectInput.vue -->
<template>
    <div>
      <label class="flex overflow-hidden font-bold mb-1">{{ label }}</label>
      <select
        v-model="selected"
        class="w-full rounded-lg bg-zinc-800 p-2 outline-none border-zinc-600 border-2"
      >
        <option
          v-for="option in options"
          :key="option"
          :value="option"
          class="rounded-lg"
        >
          {{ option }}
        </option>
      </select>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from "vue";
  const props = defineProps({
    label: { type: String, required: true },
    options: { type: Array, required: true },
    modelValue: { type: [String, Number], default: "" },
  });
  const emit = defineEmits(["update:modelValue"]);
  const selected = ref(props.modelValue);
  watch(selected, (val) => {
    emit("update:modelValue", val);
  });
  </script>
  