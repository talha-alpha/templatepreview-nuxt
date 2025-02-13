<template>
  <div
    class="flex flex-col min-h-[700px] min-w-[300px] p-4 rounded-xl bg-background text-sm"
  >
    <h2 class="text-lg font-bold mb-6">Pre-Webinar Media</h2>

    <div class="mb-4">
      <Label class="flex overflow-hidden font-bold"
        >Pre-Webinar Media Type</Label
      >
      <select
        v-model="styles.fontWeight"
        class="w-full bg-zinc-800 p-2 rounded-lg outline-none border-zinc-600 border-2"
      >
        <option class="rounded-lg">Audio</option>
        <option class="rounded-lg">Video</option>
      </select>
    </div>

    <div class="mb-4">
      <Label class="flex overflow-hidden font-bold"
        >Pre-Webinar Media File</Label
      >
      <select
        v-model="styles.fontWeight"
        class="w-full bg-zinc-800 p-2 rounded-lg outline-none border-zinc-600 border-2"
      >
        <option class="rounded-lg">Audio Type 1</option>

        <option class="rounded-lg">Audio Type 2</option>

        <option class="rounded-lg">Audio Type 3</option>
      </select>
    </div>

    <Button
      class="w-full bg-blue-500 hover:bg-blue-600 text-white p-4 font-bold rounded-lg"
      @click="updateSettings"
    >
      Update Settings
    </Button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  settings: {
    type: Object,
    required: true,
  },
});
const styles = ref(props.settings);


const updateSettings = () => {
  console.log("Settings updated:", styles.value);
};

const backToNavbar = () => {
  activeComponent.value = null;
  currentComponent.value = null;
};
</script>

<style scoped>
input[type="color"] {
  border-radius: 4px;
  padding: 0;
  border: 0px;
  overflow: hidden;
}

input[type="color"]::-moz-color-swatch {
  border: none;
}

input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
  border-radius: 4px;
}

input[type="color"]::-webkit-color-swatch {
  border: none;
}
</style>
