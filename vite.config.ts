import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { createServer } from "./server";

export default defineConfig(() => ({
  server: {
    host: "::",
    port: 5173,
    fs: {
      allow: [
        path.resolve(__dirname, "./"),
        path.resolve(__dirname, "./client"),
        path.resolve(__dirname, "./shared"),
      ],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },
  build: {
    outDir: "dist/spa",
  },
  plugins: [
    expressPlugin(), // ✅ FIRST
    react(),         // ✅ LAST
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
}));

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve",
    configureServer(server) {
      const app = createServer();
      server.middlewares.use(app);
    },
  };
}
