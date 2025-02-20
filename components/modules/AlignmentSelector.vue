<template>
  <div
    class="flex justify-around bg-neutral-800 p-1 rounded-lg border-neutral-700 border-2"
  >
    <button
      v-for="option in options"
      :key="option.value"
      class="p-2 hover:bg-neutral-900 rounded-lg self-center justify-center"
      :class="{
        'bg-neutral-900 justify-center': modelValue === option.value,
      }"
      @click="updatePadding(option.value)"
      v-html="option.icon"
    ></button>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: String, default: "left" },
  options: { type: Array, required: true },
});

const emit = defineEmits(["update:modelValue", "updatePadding"]);

const updatePadding = (value) => {
  emit("update:modelValue", value);
  emit("updatePadding", value); // Send the selected padding to the parent
};
</script>
