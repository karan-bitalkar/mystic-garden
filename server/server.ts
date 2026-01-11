  // import "dotenv/config";
  // import express from "express";
  // import cors from "cors";
  // import { connectDB } from "./db";

  // import {
  //   handleCancelBooking,
  //   handleCreateBooking,
  //   handleGetBookings,
  //   handleUpdateBookingStatus,
  // } from "./routes/booking";

  // import { handleLogin, handleRegister } from "./routes/auth";
  // import { handleGetServiceById, handleGetServices } from "./routes/Service";

  // export function createServer() {
  //   connectDB();

  //   const app = express();

  //   // ✅ FIXED CORS (browser + S3 ke liye)
  //   app.use(
  //     cors({
  //       origin: "*", // testing ke liye
  //       methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  //       allowedHeaders: ["Content-Type", "Authorization"],
  //     })
  //   );

  //   // ✅ OPTIONS preflight (MOST IMPORTANT)
  //   app.options("*", cors());

  //   app.use(express.json());

  //   // Health
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

  //   return app;
  // }


//   import "dotenv/config";
// import express from "express";
// import bodyParser from "body-parser";  
// import cors from "cors";
// import connectDB from "./db";
// import adminRoutes from "./routes/admin";


// import {
//   handleCancelBooking,
//   handleCreateBooking,
//   handleGetBookings,
//   handleUpdateBookingStatus,
// } from "./routes/booking";

// import { handleLogin, handleRegister } from "./routes/auth";
// import { handleGetServiceById, handleGetServices } from "./routes/Service";


// export function createServer() {
//   const app = express();

//   // ✅ BODY PARSERS – FIRST (MOST IMPORTANT)
//   app.use(express.json());
//   app.use(express.urlencoded({ extended: true }));

//   // ✅ CORS
//   app.use(
//     cors({
//       origin: "*",
//       methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//       allowedHeaders: ["Content-Type", "Authorization"],
//     })
//   );
//   app.options("*", cors());

//   // ✅ DB AFTER middleware
//   connectDB();

//   // Health
//   app.get("/api/health", (_req, res) => {
//     res.json({ status: "OK" });
//   });

//   // Admin routes
//   app.use("/api/admin", adminRoutes);
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

//   return app;
// }
  

// import "dotenv/config";
// import express from "express";
// import cors from "cors";
// import connectDB from "./db";
// import adminRoutes from "./routes/admin";

// import {
//   handleCancelBooking,
//   handleCreateBooking,
//   handleGetBookings,
//   handleUpdateBookingStatus,
// } from "./routes/booking";

// import { handleLogin, handleRegister } from "./routes/auth";
// import { handleGetServiceById, handleGetServices } from "./routes/Service";

// export function createServer() {
//   const app = express();

//   // Body parsers
//   app.use(express.json());
//   app.use(express.urlencoded({ extended: true }));

//   // CORS
//   app.use(
//     cors({
//       origin: "*",
//       methods: ["GET", "POST", "PUT", "DELETE"],
//       allowedHeaders: ["Content-Type", "Authorization"],
//     })
//   );

//   // DB
//   connectDB();

//   // Health check
//   app.get("/api/health", (_req, res) => {
//     res.json({ status: "OK" });
//   });

//   // Routes
//   app.use("/api/admin", adminRoutes);

//   app.get("/api/services", handleGetServices);
//   app.get("/api/services/:id", handleGetServiceById);

//   app.post("/api/auth/register", handleRegister);
//   app.post("/api/auth/login", handleLogin);

//   app.get("/api/bookings", handleGetBookings);
//   app.post("/api/bookings", handleCreateBooking);
//   app.put("/api/bookings/:id/status", handleUpdateBookingStatus);
//   app.delete("/api/bookings/:id", handleCancelBooking);

//   return app;
// }


import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./db";
import adminRoutes from "./routes/admin";

import {
  handleCancelBooking,
  handleCreateBooking,
  handleGetBookings,
  handleUpdateBookingStatus,
} from "./routes/booking";

import { handleLogin, handleRegister } from "./routes/auth";
import { handleGetServiceById, handleGetServices } from "./routes/Service";

export function createServer() {
  const app = express();

  // ======================
  // BODY PARSERS
  // ======================
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // ======================
  // CORS (❌ NO wildcard route here)
  // ======================
  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  // ======================
  // DATABASE
  // ======================
  connectDB();

  // ======================
  // HEALTH CHECK
  // ======================
  app.get("/api/health", (_req, res) => {
    res.json({ status: "OK" });
  });

  // ======================
  // ROUTES
  // ======================
  app.use("/api/admin", adminRoutes);

  app.get("/api/services", handleGetServices);
  app.get("/api/services/:id", handleGetServiceById);

  app.post("/api/auth/register", handleRegister);
  app.post("/api/auth/login", handleLogin);

  app.get("/api/bookings", handleGetBookings);
  app.post("/api/bookings", handleCreateBooking);
  app.put("/api/bookings/:id/status", handleUpdateBookingStatus);
  app.delete("/api/bookings/:id", handleCancelBooking);

  return app;
}
