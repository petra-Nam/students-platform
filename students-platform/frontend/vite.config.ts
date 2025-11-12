
 import { defineConfig } from "vite";
import tailwindcss from '@tailwindcss/vite'
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue(),tailwindcss()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true
      }
    }
  }
});