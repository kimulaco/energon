import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const { PORT } = process.env;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: isNaN(Number(PORT)) ? 8001 : Number(PORT),
  },
  preview: {
    port: isNaN(Number(PORT)) ? 8001 : Number(PORT),
  },
});
