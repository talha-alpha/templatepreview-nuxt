<!-- ColorPicker.vue -->
<template>
    <div class="flex gap-2 items-center">
      <!-- Color picker -->
      <input
        type="color"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="w-10 h-10 rounded cursor-pointer bg-zinc-900"
      />
      <!-- HEX input -->
      <div class="flex overflow-hidden justify-between border-zinc-600 border-2 rounded-lg">
        <p class="flex overflow-hidden text-center mx-4 p-2">HEX</p>
        <input
          type="text"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          class="font-mono p-2 bg-zinc-800 outline-none text-center"
          placeholder="#FFFFFF"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    modelValue: {
      type: String,
      default: "#FFFFFF",
    },
  });
  defineEmits(["update:modelValue"]);
  </script>
  