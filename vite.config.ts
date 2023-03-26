import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";
import checker from "vite-plugin-checker";

import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteTsconfigPaths(),
    svgrPlugin(),
    checker({ typescript: true }),
  ],
  server: { open: true },
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "./src/app"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@models": path.resolve(__dirname, "./src/models"),
      "@ui": path.resolve(__dirname, "./src/features/@ui"),
      "@loan": path.resolve(__dirname, "./src/features/loan"),
      "@users": path.resolve(__dirname, "./src/features/users"),
      "@utils": path.resolve(__dirname, "./src/features/utils"),
      "@courses": path.resolve(__dirname, "./src/features/courses"),
      "@devices": path.resolve(__dirname, "./src/features/devices"),
    },
  },
});
