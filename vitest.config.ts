import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    include: ["tests/**/*.test.tsx"],
    environment: "jsdom",
    setupFiles: "./tests/setup.ts",

    // coverage: {
    //   provider: "v8",
    //   include: ["src/**/*"],
    //   exclude: [],
    //   clean: true,
    // },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
