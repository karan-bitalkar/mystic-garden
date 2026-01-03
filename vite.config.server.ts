import "dotenv/config";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  build: {
    // ✅ MUST be relative with ./
    ssr: "./server/index.ts",

    outDir: "dist/server",
    target: "node20",
    emptyOutDir: true,

    rollupOptions: {
      external: [
        "fs",
        "path",
        "url",
        "http",
        "https",
        "os",
        "crypto",
        "stream",
        "util",
        "events",
        "buffer",
        "querystring",
        "child_process",
        "express",
        "cors",
      ],
      output: {
        format: "es",
        entryFileNames: "node-build.mjs",
      },
    },

    minify: false,
    sourcemap: true,
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },

  define: {
    "process.env.NODE_ENV": '"production"',
  },
});
