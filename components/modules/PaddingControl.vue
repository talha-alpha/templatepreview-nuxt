<template>
  <div>
    <label class="flex overflow-hidden font-semibold mb-1">Padding</label>
    <div class="grid grid-cols-2 gap-2">
      <div
        v-for="side in sides"
        :key="side.key"
        class="flex gap-2 items-center bg-neutral-800 justify-between rounded-lg border-neutral-600 border-[1px]"
      >
        <label class="p-2 text-center text-sm w-[50%]">{{ side.label }}</label>
        <input
          type="number"
          :value="padding[side.key]"
          @input="handleInput($event, side.key)"
          class="w-[50%] p-2 bg-neutral-900 rounded-r-lg outline-none text-center"
          placeholder="0"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  padding: { type: Object, required: true },
});

const emit = defineEmits(["update:padding"]);

const sides = [
  { label: "Top", key: "top" },
  { label: "Right", key: "right" },
  { label: "Bottom", key: "bottom" },
  { label: "Left", key: "left" },
];

const handleInput = (event, key) => {
  let value = event.target.value.slice(0, 3); // Limit input to 3 digits
  value = Number(value) || 0; // Ensure it's a number
  event.target.value = value; // Update input field

  emit("update:padding", { ...props.padding, [key]: value });
};
</script>
