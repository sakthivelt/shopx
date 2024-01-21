/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        appColor: {
          light: "#FFFFFF",
          DEFAULT: "#FFFFFF",
          dark: "#9BA1A6",
        },
        appBg: {
          dark: "#111111",
          DEFAULT: "#161616",
          light: "#161616",
          semilight: "#1C1C1C",
          hoverSemilight: "#232323",
        },
        "app-bg": "#161616",
        "app-dark": "#111111",
        "app-border": "#FFFFFF",
        "app-txt-light": "#FFFFFF",
        "app-txt-dark": "#9BA1A6",
        appLine: "#292929",
        appBorder: "#ffffff1a",
        semilight: "#1C1C1C",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
