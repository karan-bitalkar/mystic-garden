import { Router } from "express";
import Booking from "../models/Booking";

const router = Router();

router.get("/", async (_req, res) => {
  const orders = await Booking.find().sort({ createdAt: -1 });
  res.json({ orders });
});

router.patch("/:id/accept", async (req, res) => {
  await Booking.findByIdAndUpdate(req.params.id, { status: "accepted" });
  res.json({ success: true });
});

router.patch("/:id/reject", async (req, res) => {
  await Booking.findByIdAndUpdate(req.params.id, { status: "rejected" });
  res.json({ success: true });
});

router.patch("/:id/complete", async (req, res) => {
  await Booking.findByIdAndUpdate(req.params.id, { status: "completed" });
  res.json({ success: true });
});

export default router;
