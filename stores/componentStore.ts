import { defineStore } from "pinia";

export const useComponentStore = defineStore("component", {
  state: () => ({
    settings: {
      Headline: {
        text: "This is your Opening Room Headline",
        alignment: "center",
        fontFamily: "Arial",
        fontWeight: "Bold",
        fontSize: 40,
        fontColor: "#FFFFFF",
        bgColor: "transparent",
        padding: { top: 150, right: 10, bottom: 10, left: 10 },
      },
      Subheadline: {
        text: "This is your subheadline",
        alignment: "center",
        fontFamily: "Cambria",
        fontWeight: "Normal",
        fontSize: 28,
        fontColor: "#FFFFFF",
        bgColor: "transparent",
        padding: { top: 5, right: 5, bottom: 5, left: 5 },
      },
      Timertext: {
        text: "Starting in.....",
        alignment: "center",
        fontFamily: "Arial",
        fontWeight: "Normal",
        fontSize: 20,
        fontColor: "#FFFFF0",
        bgColor: "transparent",
        padding: { top: 5, right: 5, bottom: 5, left: 5 },
      },
      Prewebinar: {
        text: "Webinar starting soon!",
        fontSize: 22,
        fontColor: "#008000",
        mediaType: "video",
        mediaFile: null,
      },
      Countdown: {
        time: 1800,
        duration: 30,
        selectedElement: "timer",
        period: {
          fontFamily: "Arial",
          fontWeight: "Normal",
          fontSize: 10,
          fontColor: "#FFFFFF",
          bgColor: "#000000",
        },
        timer: {
          fontFamily: "Arial",
          fontWeight: "Bold",
          fontSize: 48,
          fontColor: "#FFFFFF",
          bgColor: "transparent",
        },
        bgColor: "transparent",
      },
      Background: { bgColor: "#121212", bgImage: null },
    },
    visibility: {
      Background: true,
      Headline: true,
      Subheadline: true,
      Timertext: true,
      Prewebinar: true,
      Countdown: true,
    },
  }),
  actions: {
    // toggleVisibility(comp: string) {
    //   this.visibility[comp] = !this.visibility[comp];
    // },
    // updateSettings(component: string, newSettings: object) {
    //   this.settings[component] = {
    //     ...this.settings[component],
    //     ...newSettings,
    //   };
    // },
    decrementCountdown() {
      if (this.settings.Countdown.time > 0) {
        this.settings.Countdown.time--;
      }
    },
  },
});
