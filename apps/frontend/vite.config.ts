import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const isSsrBuild = process.env.SSR_BUILD === "true";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: isSsrBuild ? "dist/server" : "dist/client",
    ssr: isSsrBuild,
    rollupOptions: isSsrBuild ? { input: "src/entry-server.tsx" } : undefined,
  },
  ssr: {
    noExternal: ["react-helmet-async"],
  },
});
