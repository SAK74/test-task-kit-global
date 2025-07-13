import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import tsconfigpaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigpaths({ root: "." })],
  test: {
    globals: true,
    include: ["tests/**/*.test.tsx"],
    environment: "jsdom",
    setupFiles: "./tests/setup.ts",
  },
});
