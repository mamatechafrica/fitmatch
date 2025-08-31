/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: "#0f0e0c",
        },
        red: {
          DEFAULT: "##FF0000",
        },
        primary: {
          DEFAULT: "#D32C1C",
          light: "#D0A0A0",
        },
      },
    },
  },
  plugins: [],
};
