<!-- AlignmentSelector.vue -->
<template>
  <div
    class="flex justify-between bg-zinc-800 rounded-lg border-zinc-600 border-2"
  >
    <button
      v-for="option in options"
      :key="option.value"
      class="p-4 hover:bg-zinc-900 rounded-lg"
      :class="{ 'is-selected': modelValue === option.value }"
      @click="$emit('update:modelValue', option.value)"
      v-html="option.icon"
    ></button>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: String, default: "left" },
  options: { type: Array, required: true },
});
defineEmits(["update:modelValue"]);
</script>
