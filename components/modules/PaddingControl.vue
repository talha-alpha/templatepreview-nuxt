<!-- PaddingControl.vue -->
<template>
  <div>
    <label class="flex overflow-hidden font-bold mb-1">Padding</label>
    <div class="grid grid-cols-2 gap-2">
      <div
        v-for="side in sides"
        :key="side.key"
        class="flex gap-2 items-center bg-zinc-800 justify-between rounded-lg border-zinc-600 border-2"
      >
        <label class="w-10 p-2 text-center text-sm">{{ side.label }}</label>
        <input
          type="number"
          :value="padding[side.key]"
          @input="
            $emit('update:padding', {
              ...padding,
              [side.key]: Number($event.target.value) || 0,
            })
          "
          class="w-20 p-2 bg-zinc-900 rounded-r-lg outline-none text-center"
          placeholder="0"
          maxlength="3"
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
</script>
