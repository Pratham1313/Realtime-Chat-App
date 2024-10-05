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
    themes: [
      {
        light: {
          background: "#212529", // Your default background color for light theme
        },
        dark: {
          primary: "#a991f7",
          secondary: "#f6d860",
          accent: "#37cdbe",
          neutral: "#3d4451",
          "base-100": "#222831", // Your default background color for dark theme
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
          background: "#212529", // Your default background color for dark theme
        },
      },
      // Other themes can be added here
    ],
  },
};
