// import "dotenv/config";
// import express from "express";
import cors from "cors";
// import { connectDB } from "./db";

// import {
//   handleCancelBooking,
//   handleCreateBooking,
//   handleGetBookings,
//   handleUpdateBookingStatus
// } from "./routes/booking";

// import { handleLogin, handleRegister } from "./routes/auth";
// import { handleGetServiceById, handleGetServices } from "./routes/Service";

// export function createServer() {
//   connectDB();

//   const app = express();

//   app.use(express.json());

//   app.get("/api/health", (_req, res) => {
//     res.json({ status: "OK" });
//   });

//   // Services
//   app.get("/api/services", handleGetServices);
//   app.get("/api/services/:id", handleGetServiceById);

//   // Auth
//   app.post("/api/auth/register", handleRegister);
//   app.post("/api/auth/login", handleLogin);

//   // Bookings
//   app.get("/api/bookings", handleGetBookings);
//   app.post("/api/bookings", handleCreateBooking);
//   app.put("/api/bookings/:id/status", handleUpdateBookingStatus);
//   app.delete("/api/bookings/:id", handleCancelBooking);

//   console.log(`✅ Express app created on http://localhost:${process.env.PORT || 5000}`);
//   return app;
// }


// import path from "path";
// import express from "express";
// import { createServer } from "./server";

// const PORT = process.env.PORT || 5000;
// const HOST = "0.0.0.0";

// const app = createServer();

// // SPA build path
// const __dirname = import.meta.dirname;
// const distPath = path.join(__dirname, "../spa");

// // Serve frontend
// app.use(express.static(distPath));

// // ✅ Express 5 SAFE fallback
// app.use((req, res, next) => {
//   if (req.path.startsWith("/api")) return next();
//   res.sendFile(path.join(distPath, "index.html"));
// });

// app.listen(PORT, HOST, () => {
//   console.log(`🚀 Server running on http://${HOST}:${PORT}`);
// });
// export { createServer };


// index.ts
import path from "path";
import express from "express";
import { fileURLToPath } from "url";
import { createServer } from "./server";

// ✅ FIX: PORT ko number me convert karo
// const PORT: number = Number(process.env.PORT) || 5000;
const PORT: number = Number(process.env.PORT) || 8080;
const HOST = "0.0.0.0";

const app = createServer();

// Get __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// SPA build path
const distPath = path.join(__dirname, "../spa");

// Serve frontend
app.use(express.static(distPath));

// Fallback for SPA (React/Vite)
app.use((req, res, next) => {
  if (req.path.startsWith("/api")) return next();
  res.sendFile(path.join(distPath, "index.html"));
});

// Start server
app.listen(PORT, HOST, () => {
  console.log(`🚀 Server running on http://${HOST}:${PORT}`);
});
