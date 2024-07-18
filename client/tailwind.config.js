/** @type {import('tailwindcss').Config} */
import tailWindScrollbar from "tailwind-scrollbar";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        jost: ["Jost", "sans-serif"],
      },
      colors: {
        gray: "#f2f4ff",
        "gray-darkest": "#373f68",
        "gray-darker": "#647196",
        purple: "#ad1fea",
        "hover-purple": "#c75af6",
        blue: "#4661e6",
        "hover-blue": "#7c91f9",
        "blue-light": "#62bcfa",
        overlay: "rgba(0, 0, 0, .5);",
      },
      screens: {
        sd: "450px",
        dl: "850px",
      },
    },
  },
  plugins: [tailWindScrollbar({ preferredStrategy: "pseudoelements" })],
};
