/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,tsx}", "./components/**/*.{js,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#D32C1C",
          light: "#D0A0A0",
        },
        red: {
          DEFAULT: "#FF0000",
        },
        dark: {
          DEFAULT: "#0f0e0c",
        },
      },
      fontFamily: {
        "kavivanar": ["Kavivanar-Regular"],
        "roboto-condensed-black": ["RobotoCondensed-Black"],
        "roboto-condensed-bold": ["RobotoCondensed-Bold"],
        "roboto-condensed-extrabold": ["RobotoCondensed-ExtraBold"],
        "roboto-condensed-medium": ["RobotoCondensed-Medium"],
        "roboto-condensed-regular": ["RobotoCondensed-Regular"],
        "roboto-condensed-semibold": ["RobotoCondensed-SemiBold"],
        "roboto-semicondensed-extrabold": ["RobotoSemiCondensed-ExtraBold"],
        "roboto": ["Roboto-Regular"],
        "roboto-bold": ["Roboto-Bold"],
        "roboto-medium": ["Roboto-Medium"],
        "inter": ["Inter_18pt-Regular"],
        "inter-medium": ["Inter_18pt-Medium"],
        "inter-bold": ["Inter_18pt-Bold"],
        "reddit-sans-bold": ["Reddit_Sans-Bold"],
      },
    },
  },
  plugins: [],
}