<!-- TextAreaInput.vue -->
<template>
    <div>
      <label class="flex overflow-hidden font-bold mb-1">{{ label }}</label>
      <textarea
        :value="modelValue"
        @input="onInput"
        :placeholder="placeholder"
        class="w-full bg-zinc-800 p-2 rounded-lg outline-none text-sm border-zinc-600 border-2"
      ></textarea>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    label: {
      type: String,
      default: "Text",
    },
    modelValue: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "This is your Opening Room Headline",
    },
  });
  const emit = defineEmits(["update:modelValue"]);
  
  function onInput(event) {
    emit("update:modelValue", event.target.value);
  }
  </script>
  