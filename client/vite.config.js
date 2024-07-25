import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://feedback-app-08eo.onrender.com",
        changeOrigin: true,
      },
    },
  },
});
