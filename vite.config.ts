import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";
import { BASE_URL } from "./base";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), ViteImageOptimizer()],
  server: { port: 3000, host: true },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  base: BASE_URL,
});
