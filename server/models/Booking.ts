// import { RequestHandler } from "express";
// import { mockBookings } from "../index";

// export const handleGetBookings: RequestHandler = (req, res) => {
//   try {
//     const { userId, status } = req.query;

//     let bookings = mockBookings;

//     // Filter by userId if provided
//     if (userId && typeof userId === "string") {
//       bookings = bookings.filter((booking) => booking.userId === userId);
//     }

//     // Filter by status if provided
//     if (status && typeof status === "string") {
//       bookings = bookings.filter((booking) => booking.status === status);
//     }

//     res.json({
//       success: true,
//       data: bookings,
//       count: bookings.length,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: "Failed to fetch bookings",
//     });
//   }
// };

// export const handleCreateBooking: RequestHandler = (req, res) => {
//   try {
//     const {
//       userId,
//       serviceId,
//       serviceName,
//       date,
//       time,
//       address,
//       phone,
//       price,
//       paymentMethod,
//     } = req.body;

//     // Validate input
//     if (
//       !userId ||
//       !serviceId ||
//       !serviceName ||
//       !date ||
//       !time ||
//       !address ||
//       !phone ||
//       !price ||
//       !paymentMethod
//     ) {
//       res.status(400).json({
//         success: false,
//         error: "All fields are required",
//       });
//       return;
//     }

//     // Create booking
//     const newBooking = {
//       id: `booking_${Date.now()}`,
//       userId,
//       serviceId,
//       serviceName,
//       date,
//       time,
//       address,
//       phone,
//       price,
//       paymentMethod,
//       status: "pending",
//       createdAt: new Date().toISOString(),
//     };

//     mockBookings.push(newBooking);

//     res.status(201).json({
//       success: true,
//       message: "Booking created successfully",
//       data: newBooking,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: "Failed to create booking",
//     });
//   }
// };

// export const handleUpdateBookingStatus: RequestHandler = (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     // Validate status
//     const validStatuses = ["pending", "confirmed", "completed", "cancelled"];
//     if (!validStatuses.includes(status)) {
//       res.status(400).json({
//         success: false,
//         error: "Invalid status",
//       });
//       return;
//     }

//     // Find and update booking
//     const booking = mockBookings.find((b) => b.id === id);

//     if (!booking) {
//       res.status(404).json({
//         success: false,
//         error: "Booking not found",
//       });
//       return;
//     }

//     booking.status = status;

//     res.json({
//       success: true,
//       message: "Booking status updated",
//       data: booking,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: "Failed to update booking",
//     });
//   }
// };

// export const handleCancelBooking: RequestHandler = (req, res) => {
//   try {
//     const { id } = req.params;

//     // Find booking
//     const bookingIndex = mockBookings.findIndex((b) => b.id === id);

//     if (bookingIndex === -1) {
//       res.status(404).json({
//         success: false,
//         error: "Booking not found",
//       });
//       return;
//     }

//     // Cancel booking
//     mockBookings[bookingIndex].status = "cancelled";

//     res.json({
//       success: true,
//       message: "Booking cancelled successfully",
//       data: mockBookings[bookingIndex],
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: "Failed to cancel booking",
//     });
//   }
// };



// import { RequestHandler } from "express";
// import { mockBookings } from "../index";

// // ===============================
// // GET BOOKINGS
// // ===============================
// export const handleGetBookings: RequestHandler = (req, res) => {
//   try {
//     const { userId, status } = req.query;

//     // ===============================
//     // CHANGE-1: userId mandatory check for security
//     // Comment: Ab koi bhi user sirf apni bookings dekh sakta hai
//     // ===============================
//     if (!userId || typeof userId !== "string") {
//       return res.status(401).json({
//         success: false,
//         error: "Unauthorized: userId required",
//       });
//     }

//     let bookings = mockBookings;

//     // Filter by userId
//     bookings = bookings.filter((booking) => booking.userId === userId);

//     // Filter by status if provided
//     if (status && typeof status === "string") {
//       bookings = bookings.filter((booking) => booking.status === status);
//     }

//     res.json({
//       success: true,
//       data: bookings,
//       count: bookings.length,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: "Failed to fetch bookings",
//     });
//   }
// };

// // ===============================
// // CREATE BOOKING
// // ===============================
// export const handleCreateBooking: RequestHandler = (req, res) => {
//   try {
//     const {
//       userId,
//       serviceId,
//       serviceName,
//       date,
//       time,
//       address,
//       phone,
//       price,
//       paymentMethod,
//     } = req.body;

//     // Validate input
//     if (
//       !userId ||
//       !serviceId ||
//       !serviceName ||
//       !date ||
//       !time ||
//       !address ||
//       !phone ||
//       !price ||
//       !paymentMethod
//     ) {
//       res.status(400).json({
//         success: false,
//         error: "All fields are required",
//       });
//       return;
//     }

//     const newBooking = {
//       id: `booking_${Date.now()}`,
//       userId,
//       serviceId,
//       serviceName,
//       date,
//       time,
//       address,
//       phone,
//       price,
//       paymentMethod,
//       status: "pending",
//       createdAt: new Date().toISOString(),
//     };

//     mockBookings.push(newBooking);

//     res.status(201).json({
//       success: true,
//       message: "Booking created successfully",
//       data: newBooking,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: "Failed to create booking",
//     });
//   }
// };

// // ===============================
// // UPDATE BOOKING STATUS
// // ===============================
// export const handleUpdateBookingStatus: RequestHandler = (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     // ===============================
//     // CHANGE-2: status mandatory check
//     // Comment: Agar status empty hai toh 400 error aayega
//     // ===============================
//     if (!status) {
//       return res.status(400).json({
//         success: false,
//         error: "Status is required",
//       });
//     }

//     const validStatuses = ["pending", "confirmed", "completed", "cancelled"];
//     if (!validStatuses.includes(status)) {
//       return res.status(400).json({
//         success: false,
//         error: "Invalid status",
//       });
//     }

//     const booking = mockBookings.find((b) => b.id === id);

//     if (!booking) {
//       return res.status(404).json({
//         success: false,
//         error: "Booking not found",
//       });
//       return;
//     }

//     booking.status = status;

//     res.json({
//       success: true,
//       message: "Booking status updated",
//       data: booking,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: "Failed to update booking",
//     });
//   }
// };

// // ===============================
// // CANCEL BOOKING
// // ===============================
// export const handleCancelBooking: RequestHandler = (req, res) => {
//   try {
//     const { id } = req.params;

//     const bookingIndex = mockBookings.findIndex((b) => b.id === id);

//     if (bookingIndex === -1) {
//       return res.status(404).json({
//         success: false,
//         error: "Booking not found",
//       });
//     }

//     // ===============================
//     // CHANGE-3: Already cancelled check
//     // Comment: Agar booking pehle se cancelled hai toh 400 error
//     // ===============================
//     if (mockBookings[bookingIndex].status === "cancelled") {
//       return res.status(400).json({
//         success: false,
//         error: "Booking already cancelled",
//       });
//     }

//     mockBookings[bookingIndex].status = "cancelled";

//     res.json({
//       success: true,
//       message: "Booking cancelled successfully",
//       data: mockBookings[bookingIndex],
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: "Failed to cancel booking",
//     });
//   }
// };







// import { RequestHandler } from "express";
// import { mockBookings } from "../index";

// // ===============================
// // GET BOOKINGS
// // ===============================
// export const handleGetBookings: RequestHandler = (req, res) => {
//   try {
//     const userId = req.query.userId as string; // Change: Ensure string type

//     // CHANGE-1: userId mandatory for security
//     if (!userId) {
//       return res.status(401).json({
//         success: false,
//         error: "Unauthorized: userId required",
//       });
//     }

//     let bookings = mockBookings.filter((b) => b.userId === userId);

//     const status = req.query.status as string;
//     if (status) {
//       bookings = bookings.filter((b) => b.status === status);
//     }

//     res.json({
//       success: true,
//       data: bookings,
//       count: bookings.length,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: "Failed to fetch bookings",
//     });
//   }
// };

// // ===============================
// // CREATE BOOKING
// // ===============================
// export const handleCreateBooking: RequestHandler = (req, res) => {
//   try {
//     const {
//       userId,
//       serviceId,
//       serviceName,
//       date,
//       time,
//       address,
//       phone,
//       price,
//       paymentMethod,
//     } = req.body;

//     if (!userId || !serviceId || !serviceName || !date || !time || !address || !phone || !price || !paymentMethod) {
//       return res.status(400).json({
//         success: false,
//         error: "All fields are required",
//       });
//     }

//     const newBooking = {
//       id: `booking_${Date.now()}`,
//       userId,
//       serviceId,
//       serviceName,
//       date,
//       time,
//       address,
//       phone,
//       price,
//       paymentMethod,
//       status: "pending",
//       createdAt: new Date().toISOString(),
//     };

//     mockBookings.push(newBooking);

//     res.status(201).json({
//       success: true,
//       message: "Booking created successfully",
//       data: newBooking,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: "Failed to create booking",
//     });
//   }
// };

// // ===============================
// // UPDATE BOOKING STATUS
// // ===============================
// export const handleUpdateBookingStatus: RequestHandler = (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     // CHANGE-2: Status required
//     if (!status) {
//       return res.status(400).json({
//         success: false,
//         error: "Status is required",
//       });
//     }

//     const validStatuses = ["pending", "confirmed", "completed", "cancelled"];
//     if (!validStatuses.includes(status)) {
//       return res.status(400).json({
//         success: false,
//         error: "Invalid status",
//       });
//     }

//     const booking = mockBookings.find((b) => b.id === id);
//     if (!booking) {
//       return res.status(404).json({
//         success: false,
//         error: "Booking not found",
//       });
//     }

//     booking.status = status;

//     res.json({
//       success: true,
//       message: "Booking status updated",
//       data: booking,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: "Failed to update booking",
//     });
//   }
// };

// // ===============================
// // CANCEL BOOKING
// // ===============================
// export const handleCancelBooking: RequestHandler = (req, res) => {
//   try {
//     const { id } = req.params;

//     const bookingIndex = mockBookings.findIndex((b) => b.id === id);

//     if (bookingIndex === -1) {
//       return res.status(404).json({
//         success: false,
//         error: "Booking not found",
//       });
//     }

//     // CHANGE-3: Already cancelled check
//     if (mockBookings[bookingIndex].status === "cancelled") {
//       return res.status(400).json({
//         success: false,
//         error: "Booking already cancelled",
//       });
//     }

//     mockBookings[bookingIndex].status = "cancelled";

//     res.json({
//       success: true,
//       message: "Booking cancelled successfully",
//       data: mockBookings[bookingIndex],
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: "Failed to cancel booking",
//     });
//   }
// };







// import { RequestHandler } from "express";
// import { mockBookings } from "../index";

// // ===============================
// // GET BOOKINGS
// // ===============================
// export const handleGetBookings: RequestHandler = (req, res) => {
//   try {
//     const userId = req.query.userId as string; // Change: Ensure string type

//     // CHANGE-1: userId mandatory for security
//     if (!userId) {
//       return res.status(401).json({
//         success: false,
//         error: "Unauthorized: userId required",
//       });
//     }

//     let bookings = mockBookings.filter((b) => b.userId === userId);

//     const status = req.query.status as string;
//     if (status) {
//       bookings = bookings.filter((b) => b.status === status);
//     }

//     res.json({
//       success: true,
//       data: bookings,
//       count: bookings.length,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: "Failed to fetch bookings",
//     });
//   }
// };

// // ===============================
// // CREATE BOOKING
// // ===============================
// export const handleCreateBooking: RequestHandler = (req, res) => {
//   try {
//     const {
//       userId,
//       serviceId,
//       serviceName,
//       date,
//       time,
//       address,
//       phone,
//       price,
//       paymentMethod,
//     } = req.body;

//     if (!userId || !serviceId || !serviceName || !date || !time || !address || !phone || !price || !paymentMethod) {
//       return res.status(400).json({
//         success: false,
//         error: "All fields are required",
//       });
//     }

//     const newBooking = {
//       id: `booking_${Date.now()}`,
//       userId,
//       serviceId,
//       serviceName,
//       date,
//       time,
//       address,
//       phone,
//       price,
//       paymentMethod,
//       status: "pending",
//       createdAt: new Date().toISOString(),
//     };

//     mockBookings.push(newBooking);

//     res.status(201).json({
//       success: true,
//       message: "Booking created successfully",
//       data: newBooking,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: "Failed to create booking",
//     });
//   }
// };

// // ===============================
// // UPDATE BOOKING STATUS
// // ===============================
// export const handleUpdateBookingStatus: RequestHandler = (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     // CHANGE-2: Status required
//     if (!status) {
//       return res.status(400).json({
//         success: false,
//         error: "Status is required",
//       });
//     }

//     const validStatuses = ["pending", "confirmed", "completed", "cancelled"];
//     if (!validStatuses.includes(status)) {
//       return res.status(400).json({
//         success: false,
//         error: "Invalid status",
//       });
//     }

//     const booking = mockBookings.find((b) => b.id === id);
//     if (!booking) {
//       return res.status(404).json({
//         success: false,
//         error: "Booking not found",
//       });
//     }

//     booking.status = status;

//     res.json({
//       success: true,
//       message: "Booking status updated",
//       data: booking,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: "Failed to update booking",
//     });
//   }
// };

// // ===============================
// // CANCEL BOOKING
// // ===============================
// export const handleCancelBooking: RequestHandler = (req, res) => {
//   try {
//     const { id } = req.params;

//     const bookingIndex = mockBookings.findIndex((b) => b.id === id);

//     if (bookingIndex === -1) {
//       return res.status(404).json({
//         success: false,
//         error: "Booking not found",
//       });
//     }

//     // CHANGE-3: Already cancelled check
//     if (mockBookings[bookingIndex].status === "cancelled") {
//       return res.status(400).json({
//         success: false,
//         error: "Booking already cancelled",
//       });
//     }

//     mockBookings[bookingIndex].status = "cancelled";

//     res.json({
//       success: true,
//       message: "Booking cancelled successfully",
//       data: mockBookings[bookingIndex],
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: "Failed to cancel booking",
//     });
//   }
// };


// import { RequestHandler } from "express";
// import Booking from './models/Booking';

// // Get bookings
// export const handleGetBookings: RequestHandler = async (req, res) => {
//   try {
//     const userId = req.query.userId as string;
//     if (!userId) return res.status(401).json({ success: false, error: "Unauthorized" });

//     const bookings = await Booking.find({ userId });
//     res.json({ success: true, data: bookings, count: bookings.length });
//   } catch (error) {
//     res.status(500).json({ success: false, error: "Failed to fetch bookings" });
//   }
// };

// // Create booking
// export const handleCreateBooking: RequestHandler = async (req, res) => {
//   try {
//     const { userId, serviceId, serviceName, date, time, address, phone, price, paymentMethod } = req.body;
//     if (!userId || !serviceId || !serviceName || !date || !time || !address || !phone || !price || !paymentMethod)
//       return res.status(400).json({ success: false, error: "All fields required" });

//     const booking = await Booking.create({ userId, serviceId, serviceName, date, time, address, phone, price, paymentMethod });
//     res.status(201).json({ success: true, message: "Booking created", data: booking });
//   } catch (error) {
//     res.status(500).json({ success: false, error: "Failed to create booking" });
//   }
// };

// // Update booking status
// export const handleUpdateBookingStatus: RequestHandler = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     if (!status) return res.status(400).json({ success: false, error: "Status required" });
//     const valid = ["pending", "confirmed", "completed", "cancelled"];
//     if (!valid.includes(status)) return res.status(400).json({ success: false, error: "Invalid status" });

//     const booking = await Booking.findByIdAndUpdate(id, { status }, { new: true });
//     if (!booking) return res.status(404).json({ success: false, error: "Booking not found" });

//     res.json({ success: true, message: "Booking status updated", data: booking });
//   } catch (error) {
//     res.status(500).json({ success: false, error: "Failed to update booking" });
//   }
// };

// // Cancel booking
// export const handleCancelBooking: RequestHandler = async (req, res) => {
//   try {
//     const booking = await Booking.findById(req.params.id);
//     if (!booking) return res.status(404).json({ success: false, error: "Booking not found" });
//     if (booking.status === "cancelled") return res.status(400).json({ success: false, error: "Already cancelled" });

//     booking.status = "cancelled";
//     await booking.save();

//     res.json({ success: true, message: "Booking cancelled", data: booking });
//   } catch (error) {
//     res.status(500).json({ success: false, error: "Failed to cancel booking" });
//   }
// };



// server/models/Booking.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
  userId: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  address: string;
  phone: string;
  price: number;
  paymentMethod: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    userId: { type: String, required: true },
    serviceId: { type: String, required: true },
    serviceName: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    price: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IBooking>("Booking", bookingSchema);