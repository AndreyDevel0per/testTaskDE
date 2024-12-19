import { defineConfig } from "vite";
import pugPlugin from "vite-plugin-pug";

export default defineConfig({
  build: {
    outDir: "./build",
  },

  server: { port: 8000, open: true },

  plugins: [pugPlugin()],
});
