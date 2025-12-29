// server/routes/booking.ts
import { RequestHandler } from "express";
import Booking from "../models/Booking";  // capital B – model file ka naam Booking.ts hona chahiye

// Ye saare functions EXPORT kar rahe hain
export const handleGetBookings: RequestHandler = async (_req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings" });
  }
};

export const handleCreateBooking: RequestHandler = async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error: any) {
    res.status(400).json({ message: error.message || "Error creating booking" });
  }
};

export const handleUpdateBookingStatus: RequestHandler = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: "Error updating status" });
  }
};

export const handleCancelBooking: RequestHandler = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: "cancelled" },
      { new: true }
    );
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json({ message: "Booking cancelled successfully", booking });
  } catch (error) {
    res.status(500).json({ message: "Error cancelling booking" });
  }
};