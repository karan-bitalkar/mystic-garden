import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./db";

import {
  handleCancelBooking,
  handleCreateBooking,
  handleGetBookings,
  handleUpdateBookingStatus
} from "./routes/booking";

import { handleLogin, handleRegister } from "./routes/auth";
import { handleGetServiceById, handleGetServices } from "./routes/Service";

export function createServer() {
  connectDB();

  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get("/api/health", (_req, res) => {
    res.json({ status: "OK" });
  });

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



// // server.ts
// import "dotenv/config";
// import express from "express";
// import cors from "cors";
// import { connectDB } from "./db";


// // Booking routes
// import {
//   handleCancelBooking,
//   handleCreateBooking,
//   handleGetBookings,
//   handleUpdateBookingStatus
// } from "./routes/booking";

// // Auth routes
// import { handleLogin, handleRegister } from "./routes/auth";

// // Service routes
// import { handleGetServiceById, handleGetServices } from "./routes/Service";

// export function createServer() {
//   // Connect to MongoDB
//   connectDB();

//   const app = express();

//   // Middleware
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173", // Vite frontend
//       "http://localhost:3000", // CRA (just in case)
//        "http://13.60.231.82:5173", // EC2 frontend
//        "http://13.60.231.82", 
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

//   // --------------------------
//   // Health Check
//   // --------------------------
//   app.get("/api/health", (_req, res) => {
//     res.json({ status: "OK" });
//   });

//   // --------------------------
//   // Services
//   // --------------------------
//   app.get("/api/services", handleGetServices);
//   app.get("/api/services/:id", handleGetServiceById);

//   // --------------------------
//   // Auth
//   // --------------------------
//   app.post("/api/auth/register", handleRegister);
//   app.post("/api/auth/login", handleLogin);

//   // --------------------------
//   // Bookings
//   // --------------------------
//   app.get("/api/bookings", handleGetBookings);
//   app.post("/api/bookings", handleCreateBooking);
//   app.put("/api/bookings/:id/status", handleUpdateBookingStatus);
//   app.delete("/api/bookings/:id", handleCancelBooking);

//   return app;
// }