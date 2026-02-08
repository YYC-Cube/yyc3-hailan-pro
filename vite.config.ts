import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "three": path.resolve(__dirname, "node_modules/three"),
    },
  },
  optimizeDeps: {
    include: [
      '@emotion/is-prop-valid', 
      'framer-motion',
    ],
    exclude: [
      'react-router',
    ],
  },
});
