// import path from "path";
// import { createServer } from "./index";
// import * as express from "express";

// const app = createServer();
// const port = process.env.PORT || 3000;

// // In production, serve the built SPA files
// const __dirname = import.meta.dirname;
// const distPath = path.join(__dirname, "../spa");

// // Serve static files
// app.use(express.static(distPath));

// // Handle React Router - serve index.html for all non-API routes
// app.get("*", (req, res) => {
//   // Don't serve index.html for API routes
//   if (req.path.startsWith("/api/") || req.path.startsWith("/health")) {
//     return res.status(404).json({ error: "API endpoint not found" });
//   }

//   res.sendFile(path.join(distPath, "index.html"));
// });

// app.listen(port, () => {
//   console.log(`🚀 Fusion Starter server running on port ${port}`);
//   console.log(`📱 Frontend: http://localhost:${port}`);
//   console.log(`🔧 API: http://localhost:${port}/api`);
// });

// // Graceful shutdown
// process.on("SIGTERM", () => {
//   console.log("🛑 Received SIGTERM, shutting down gracefully");
//   process.exit(0);
// });

// process.on("SIGINT", () => {
//   console.log("🛑 Received SIGINT, shutting down gracefully");
//   process.exit(0);
// });


// server/node-build.ts
import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { connectDB } from "./db";
import {
  handleCancelBooking,
  handleCreateBooking,
  handleGetBookings,
  handleUpdateBookingStatus
} from "./routes/booking";
import { handleLogin, handleRegister } from "./routes/auth";
import { handleGetServiceById, handleGetServices } from "./routes/Service";

// Create Express App
export function createServer() {
  connectDB();

  const app = express();
  app.use(cors());
  app.use(express.json());

  // Health check
  app.get("/api/health", (_req, res) => res.json({ status: "OK" }));

  // Services
  app.get("/api/services", handleGetServices);
  app.get("/api/services/:id", handleGetServiceById);

  // Auth
  app.post("/api/auth/register", handleRegister);
  app.post("/api/auth/login", handleLogin);

  // Bookings
  app.get("/api/bookings", handleGetBookings);
  app.post("/api/bookings", handleCreateBooking);
  app.put("/api/bookings/:id/status", handleUpdateBookingStatus);
  app.delete("/api/bookings/:id", handleCancelBooking);

  return app;
}

// Server Start
const app = createServer();
const port = process.env.PORT || 5000; // EC2 me 5000 ya environment variable
const __dirname = path.resolve();

const distPath = path.join(__dirname, "../spa"); // React build folder

// Serve frontend build
app.use(express.static(distPath));

// SPA routing (React Router)
app.get("/*", (req, res) => {
  if (req.path.startsWith("/api/") || req.path.startsWith("/health")) {
    return res.status(404).json({ error: "API endpoint not found" });
  }
  res.sendFile(path.join(distPath, "index.html"));
});

// Listen on 0.0.0.0 for EC2 public access
app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log(`📱 VITE_API_URL=http://13.60.231.82:5000`);
  console.log(`🔧 API: http://<EC2-PUBLIC-IP>:${port}/api`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("🛑 Received SIGTERM, shutting down gracefully");
  process.exit(0);
});
process.on("SIGINT", () => {
  console.log("🛑 Received SIGINT, shutting down gracefully");
  process.exit(0);
});
