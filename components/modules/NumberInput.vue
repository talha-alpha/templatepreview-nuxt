<template>
  <div>
    <label class="flex overflow-hidden font-bold mb-1">{{ label }}</label>
    <input
      type="number"
      v-model.number="value"
      :min="min"
      :max="max"
      class="w-full bg-neutral-800 p-3 rounded-lg outline-none border-neutral-700 border-2"
      @input="limitDigits"
    />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  label: { type: String, required: true },
  modelValue: { type: Number, default: 0 },
  min: { type: Number, default: 1 },
  max: { type: Number, default: 999 }, // Ensure max 3-digit number
});

const emit = defineEmits(["update:modelValue"]);
const value = ref(props.modelValue);

watch(value, (val) => {
  if (val > props.max) value.value = props.max; // Enforce max limit
  emit("update:modelValue", value.value);
});

const limitDigits = (event) => {
  if (event.target.value.length > 3) {
    event.target.value = event.target.value.slice(0, 3); // Trim excess digits
    value.value = Number(event.target.value);
  }
};
</script>
