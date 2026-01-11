// import { defineConfig, Plugin } from "vite";
// import react from "@vitejs/plugin-react";
// import path from "path";
// import { createServer } from "./server";

// export default defineConfig(() => ({
//   server: {
//     host: "::",
//     port: 5173,
//     fs: {
//       allow: [
//         path.resolve(__dirname, "./"),
//         path.resolve(__dirname, "./client"),
//         path.resolve(__dirname, "./shared"),
//       ],
//       deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
//     },
//   },
//   build: {
//     outDir: "dist/spa",
//   },
//   plugins: [
//     expressPlugin(), // ✅ FIRST
//     react(),         // ✅ LAST
//   ],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./client"),
//       "@shared": path.resolve(__dirname, "./shared"),
//     },
//   },
// }));

// function expressPlugin(): Plugin {
//   return {
//     name: "express-plugin",
//     apply: "serve",
//     configureServer(server) {
//       const app = createServer();
//       server.middlewares.use(app);
//     },
// //   };
//   // }

//   import { defineConfig, Plugin } from "vite";
//   import react from "@vitejs/plugin-react";
//   import path from "path";
//   import { createServer } from "./server";

//   export default defineConfig(() => ({
//     server: {
//       host: "::",
//       port: 5173,
//       fs: {
//         allow: [
//           path.resolve(__dirname, "./"),
//           path.resolve(__dirname, "./client"),
//           path.resolve(__dirname, "./shared"),
//         ],
//         deny: [
//           ".env",
//           ".env.*",
//           "*.{crt,pem}",
//           "**/.git/**",
//           "server/**",
//         ],
//       },
//     },
//     build: {
//       // ✅ Firebase deploy ke liye output folder
//       outDir: "dist/spa",
//       emptyOutDir: true, // previous builds ko clear kar dega
//     },
//     plugins: [
//       expressPlugin(), // ✅ Custom Express server
//       react(),         // ✅ React plugin last
//     ],
//     resolve: {
//       alias: {
//         "@": path.resolve(__dirname, "./client"),
//         "@shared": path.resolve(__dirname, "./shared"),
//       },
//     },
//   }));

//   // 🔹 Express plugin to use your server during dev
//   function expressPlugin(): Plugin {
//     return {
//       name: "express-plugin",
//       apply: "serve", // only during `vite dev`
//       configureServer(server) {
//         const app = createServer();
//         server.middlewares.use(app);
//       },
//     };
//   }



// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import path from "path";

// export default defineConfig({
//   server: {
//     host: "0.0.0.0",
//     port: 5173,
//   },
//   build: {
//     outDir: "dist/spa",
//     emptyOutDir: true,
//   },
//   plugins: [
//     react(),
//   ],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./client"),
//       "@shared": path.resolve(__dirname, "./shared"),
//     },
//   },
// });


//   import { defineConfig } from "vite";
//   import react from "@vitejs/plugin-react";
//   import path from "path";

//   export default defineConfig({
//     base: "./",                 // 🔥 MOST IMPORTANT
//     plugins: [react()],
//     build: {
//       outDir: "dist",            // 🔥 dist/spa NAHI
//       emptyOutDir: true,
//       sourcemap: false,
//     },

    
//     resolve: {
//       alias: {
//         "@": path.resolve(__dirname, "./client"),
//         "@shared": path.resolve(__dirname, "./shared"),
//       },
//     },
// });



import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: "./",                 // ✅ correct for cPanel / static hosting
  plugins: [react()],

  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: false,

    // 🔥 VERY IMPORTANT FOR SSR + NODE MODULES
    ssr: false,
    rollupOptions: {
      external: ["nodemailer"]
    }
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
});
