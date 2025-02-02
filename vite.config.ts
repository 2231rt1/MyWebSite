import { defineConfig } from "vite";
import { resolve } from "path";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

import viteReact from "@vitejs/plugin-react";
import sass from "vite-plugin-sass";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    viteReact(),
    TanStackRouterVite({
      autoCodeSplitting: true,
      routesDirectory: "src/app/routes/ui",
    }),
    sass(),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@app": resolve(__dirname, "src/app"),
      "@processes": resolve(__dirname, "src/processes"),
      "@pages": resolve(__dirname, "src/pages"),
      "@widgets": resolve(__dirname, "src/widgets"),
      "@features": resolve(__dirname, "src/features"),
      "@entities": resolve(__dirname, "src/entities"),
      "@shared": resolve(__dirname, "src/shared"),
    },
  },
});
