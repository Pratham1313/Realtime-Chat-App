// tailwind.config.js

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      mob: { min: "0px", max: "600px" },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    base: false, // Disable Daisy UI base styles
  },
};
