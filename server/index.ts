// import "dotenv/config";
// import express from "express";
// import cors from "cors";
// import { connectDB } from "./db";

// import {
//   handleCancelBooking,
//   handleCreateBooking,
//   handleGetBookings,
//   handleUpdateBookingStatus
// } from "./routes/booking";

// import { handleLogin, handleRegister } from "./routes/auth";
// import { handleGetServiceById, handleGetServices } from "./routes/Service";

// connectDB();

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.get("/api/health", (_req, res) => {
//   res.json({ status: "OK" });
// });

// // Services
// app.get("/api/services", handleGetServices);
// app.get("/api/services/:id", handleGetServiceById);

// // Auth
// app.post("/api/auth/register", handleRegister);
// app.post("/api/auth/login", handleLogin);

// // Bookings
// app.get("/api/bookings", handleGetBookings);
// app.post("/api/bookings", handleCreateBooking);
// app.put("/api/bookings/:id/status", handleUpdateBookingStatus);
// app.delete("/api/bookings/:id", handleCancelBooking);

// export function createServer() {
//   console.log(`✅ Backend running on http://localhost:${process.env.PORT || 5000}`);
//   return app;
// }




// import "dotenv/config";
// import express from "express";
// import cors from "cors";
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
//   app.use(cors());
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


// import "dotenv/config";
// import express from "express";
// import cors from "cors";
// import { connectDB } from "./db";

// import {
//   handleCancelBooking,
//   handleCreateBooking,
//   handleGetBookings,
//   handleUpdateBookingStatus
// } from "./routes/booking";

// import { handleLogin, handleRegister } from "./routes/auth";
// import { handleGetServiceById, handleGetServices } from "./routes/Service";

// connectDB();

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.get("/api/health", (_req, res) => {
//   res.json({ status: "OK" });
// });

// // Services
// app.get("/api/services", handleGetServices);
// app.get("/api/services/:id", handleGetServiceById);

// // Auth
// app.post("/api/auth/register", handleRegister);
// app.post("/api/auth/login", handleLogin);

// // Bookings
// app.get("/api/bookings", handleGetBookings);
// app.post("/api/bookings", handleCreateBooking);
// app.put("/api/bookings/:id/status", handleUpdateBookingStatus);
// app.delete("/api/bookings/:id", handleCancelBooking);

// export function createServer() {
//   console.log(`✅ Backend running on http://localhost:${process.env.PORT || 5000}`);
//   return app;
// }


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

  console.log(`✅ Express app created on http://localhost:${process.env.PORT || 5000}`);
  return app;
}
