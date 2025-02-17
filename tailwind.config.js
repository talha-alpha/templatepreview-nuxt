import plugin from "tailwindcss/plugin";

module.exports = {
  // ... other config options
  theme: {
    extend: {
      zIndex: {
        0: 0,
        10: 10,
      },
    },
  },
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        body: {
          backgroundColor: "black",
        },
      });
    }),
  ],
};
