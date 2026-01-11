
// // index.ts
// import path from "path";
// import express from "express";
// import { fileURLToPath } from "url";
// import { createServer } from "./server";

// // ✅ FIX: PORT ko number me convert karo
// // const PORT: number = Number(process.env.PORT) || 5000;
// const PORT: number = Number(process.env.PORT) || 5000;
// const HOST = "0.0.0.0";

// const app = createServer();

// // Get __dirname in ES Modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // SPA build path
// const distPath = path.join(__dirname, "../spa");

// // Serve frontend
// app.use(express.static(distPath));

// // Fallback for SPA (React/Vite)
// app.use((req, res, next) => {
//   if (req.path.startsWith("/api")) return next();
//   res.sendFile(path.join(distPath, "index.html"));
// });

// // Start server
// app.listen(PORT, HOST, () => {
//   console.log(`🚀 Server running on http://${HOST}:${PORT}`);
// });


//   import path from "path";
//   import express from "express";
//   import { fileURLToPath } from "url";
//   import { createServer } from "./server";
// import * as authRoutes from "./routes/auth";


//   const PORT: number = Number(process.env.PORT) || 5000;
//   const HOST = "0.0.0.0";

//   const app = createServer();

//   // __dirname
//   const __filename = fileURLToPath(import.meta.url);
//   const __dirname = path.dirname(__filename);

//   // SPA build path
//   const distPath = path.join(__dirname, "../spa");

//   // Static frontend
//   app.use(express.static(distPath));

//   // ❌ API not found
//   app.use("/api", (_req, res) => {
//     res.status(404).json({ error: "API endpoint not found" });
//   });

//   app.post("/api/auth/login", authRoutes.handleLogin);
// app.post("/api/auth/register", authRoutes.handleRegister);

//   // SPA fallback
//   // app.use((_req, res) => {
//   //   res.sendFile(path.join(distPath, "index.html"));
//   // });

//   // ✅ STATIC FRONTEND
// app.use(express.static(distPath));
//   // Start server
//   app.listen(PORT, HOST, () => {
//     console.log(`🚀 Server running on http://${HOST}:${PORT}`);
//   });


// server/index.ts
import path from "path";
import express from "express";
import { fileURLToPath } from "url";
import { createServer } from "./server";
import * as authRoutes from "./routes/auth";

const PORT: number = Number(process.env.PORT) || 5000;
const HOST = "0.0.0.0";

const app = createServer();

// __dirname fix for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// SPA build path
const distPath = path.join(__dirname, "../spa");

// ===============================
// STATIC FRONTEND
// ===============================
app.use(express.static(distPath));

// ===============================
// API ROUTES (IMPORTANT: BEFORE 404)
// ===============================
app.post("/api/auth/login", authRoutes.handleLogin);
app.post("/api/auth/register", authRoutes.handleRegister);

// (future)
// app.use("/api/bookings", bookingRoutes);
// app.use("/api/services", serviceRoutes);

// ===============================
// API 404 (LAST)
// ===============================
app.use("/api", (_req, res) => {
  res.status(404).json({ error: "API endpoint not found" });
});

// ===============================
// SPA FALLBACK (React Router)
// ===============================
app.use((_req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// ===============================
// START SERVER
// ===============================
app.listen(PORT, HOST, () => {
  console.log(`🚀 Server running on http://${HOST}:${PORT}`);
});
