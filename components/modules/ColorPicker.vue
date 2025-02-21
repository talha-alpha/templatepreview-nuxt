<!-- ColorPicker.vue -->
<template>
  <div class="flex overflow-hidden items-center">
    <!-- Color picker -->
    <input
      type="color"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="w-[50px] h-9 rounded cursor-pointer bg-neutral-900 mr-4"
    />
    <!-- HEX input -->

    <p
      class="flex overflow-hidden text-center justify-center p-2 w-[80px] bg-neutral-900 rounded-l-lg outline-none border-neutral-600 border-[1px] border-r-0"
    >
      HEX
    </p>
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="font-mono bg-neutral-800 rounded-r-lg w-[150px] outline-none text-center py-2 border-neutral-600 border-[1px] border-l-0"
      placeholder="#FFFFFF"
    />
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
