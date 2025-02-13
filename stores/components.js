import { defineStore } from "pinia";

export const useSidenavStore = defineStore("sidenav", {
  state: () => ({
    activeComponent: null,
  }),
  actions: {
    setActiveComponent(component) {
      this.activeComponent = component;
    },
    resetActiveComponent() {
      this.activeComponent = null;
    },
  },
});
