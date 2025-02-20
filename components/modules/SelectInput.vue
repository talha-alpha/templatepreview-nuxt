<template>
  <div>
    <label class="flex overflow-hidden font-bold mb-1">{{ label }}</label>
    <div class="relative">
      <select
        v-model="selected"
        class="w-full appearance-none rounded-lg bg-neutral-800 p-3 pr-10 outline-none border-neutral-700 border-2"
      >
        <option v-for="option in options" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
      <!-- Dropdown Icon -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M6 9l6 6l6 -6" />
      </svg>
    </div>
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

// Keep modelValue and selected in sync
watch(
  () => props.modelValue,
  (newVal) => {
    selected.value = newVal;
  }
);

watch(selected, (val) => {
  emit("update:modelValue", val);
});
</script>

<style scoped>
select {
  appearance: none;
}
</style>
