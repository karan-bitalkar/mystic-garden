// import "dotenv/config";
// import express from "express";
// import cors from "cors";
// import { handleDemo } from "./routes/demo";
// import { handleGetServices, handleGetServiceById } from "./routes/services";
// import {
//   handleRegister,
//   handleLogin,
//   handleLogout,
//   handleGetCurrentUser,
// } from "./routes/auth";
// import {
//   handleGetBookings,
//   handleCreateBooking,
//   handleUpdateBookingStatus,
//   handleCancelBooking,
// } from "./routes/bookings";

// // Store for mock data (in production, this would be MongoDB)
// export const mockUsers: any[] = [];
// export const mockBookings: any[] = [];

// export function createServer() {
//   const app = express();

//   // Middleware
//   app.use(cors());
//   app.use(express.json());
//   app.use(express.urlencoded({ extended: true }));

//   // Example API routes
//   app.get("/api/ping", (_req, res) => {
//     const ping = process.env.PING_MESSAGE ?? "ping";
//     res.json({ message: ping });
//   });

//   app.get("/api/demo", handleDemo);

//   // Services Routes
//   app.get("/api/services", handleGetServices);
//   app.get("/api/services/:id", handleGetServiceById);

//   // Auth Routes
//   app.post("/api/auth/register", handleRegister);
//   app.post("/api/auth/login", handleLogin);
//   app.post("/api/auth/logout", handleLogout);
//   app.get("/api/auth/me", handleGetCurrentUser);

//   // Bookings Routes
//   app.get("/api/bookings", handleGetBookings);
//   app.post("/api/bookings", handleCreateBooking);
//   // app.put("/api/bookings/:id/status", handleUpdateBookingStatus);
//   app.put("/api/bookings/:id", handleUpdateBookingStatus);
//   app.delete("/api/bookings/:id", handleCancelBooking);

//   return app;
// }

// import "dotenv/config";
// import express from "express";
// import cors from "cors";
// import { connectDB } from "./db";

// // Routes
// import { handleGetServices, handleGetServiceById } from "./routes/services";
// import { handleRegister, handleLogin } from "./routes/auth";
// import { handleGetBookings, handleCreateBooking, handleUpdateBookingStatus, handleCancelBooking } from "./routes/bookings";

// connectDB();

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.get("/api/ping", (_req, res) => res.json({ message: "pong" }));

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

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));







// import "dotenv/config";
// import express from "express";
// import cors from "cors";
// import { connectDB } from "./db";

// // Routes
// import { handleGetServices, handleGetServiceById } from "./routes/services";
// import { handleRegister, handleLogin } from "./routes/auth";
// import { handleGetBookings, handleCreateBooking, handleUpdateBookingStatus, handleCancelBooking } from "./routes/bookings";

// // Connect to MongoDB
// connectDB();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Health check
// app.get("/api/ping", (_req, res) => res.json({ message: "pong" }));

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

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// server/index.ts

// import "dotenv/config";
// import express from "express";
// import cors from "cors";
// import { connectDB } from "./db";

// // Correct Routes Imports
// import { handleGetServices, handleGetServiceById } from "./routes/Service";
// import { handleRegister, handleLogin } from "./routes/auth";
// import {
//   handleGetBookings,
//   handleCreateBooking,
//   handleUpdateBookingStatus,
//   handleCancelBooking,
// } from "./routes/booking";



// connectDB();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // app.get("/api/ping", (_req, res) => {
// //   res.json({ message: "pong" });
// // });
// app.get("/", (_req, res) => {
//   res.send("Backend is running 🚀");
// });


// // Services Routes
// app.get("/api/services", handleGetServices);
// app.get("/api/services/:id", handleGetServiceById);

// // Auth Routes
// app.post("/api/auth/register", handleRegister);
// app.post("/api/auth/login", handleLogin);

// // Bookings Routes
// app.get("/api/bookings", handleGetBookings);
// app.post("/api/bookings", handleCreateBooking);
// app.put("/api/bookings/:id/status", handleUpdateBookingStatus);
// app.delete("/api/bookings/:id", handleCancelBooking); // ya patch bhi use kar sakte ho

// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => {
// //   console.log(`✅ Server running on port ${PORT}`);
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`✅ Backend running on http://localhost:${PORT}`);
//   console.log(`🌐 Frontend running on http://localhost:5173`)
// });
















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

export function createServer() {
  console.log(`✅ Backend running on http://localhost:${process.env.PORT || 5000}`);
  return app;
}
