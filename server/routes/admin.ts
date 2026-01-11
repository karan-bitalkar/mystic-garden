import { Router } from "express";
import Booking from "../models/Booking";
import User from "../models/User";
import { isAdmin } from "../middleware/isAdmin";
import { sendMail } from "../utils/mailer";

const router = Router();

/* Dashboard stats */
router.get("/dashboard/stats", isAdmin, async (req, res) => {
  res.json({
    totalOrders: await Booking.countDocuments(),
    pendingOrders: await Booking.countDocuments({ status: "pending" }),
    completedOrders: await Booking.countDocuments({ status: "completed" }),
    totalCustomers: await User.countDocuments({ role: "user" }),
  });
});

/* All Orders */
router.get("/orders", isAdmin, async (req, res) => {
  const orders = await Booking.find().populate("user").sort({ createdAt: -1 });
  res.json({ orders });
});

/* ACCEPT */
router.patch("/orders/:id/accept", isAdmin, async (req, res) => {
  const order = await Booking.findByIdAndUpdate(
    req.params.id,
    { status: "accepted" },
    { new: true }
  ).populate("user");

  await sendMail(
    order.user.email,
    "Order Accepted - HomeServe",
    `Hi ${order.user.name}, your order has been ACCEPTED.`
  );

  res.json(order);
});

/* REJECT */
router.patch("/orders/:id/reject", isAdmin, async (req, res) => {
  const order = await Booking.findByIdAndUpdate(
    req.params.id,
    { status: "rejected" },
    { new: true }
  ).populate("user");

  await sendMail(
    order.user.email,
    "Order Rejected - HomeServe",
    `Hi ${order.user.name}, your order has been REJECTED.`
  );

  res.json(order);
});

/* COMPLETE */
router.patch("/orders/:id/complete", isAdmin, async (req, res) => {
  const order = await Booking.findByIdAndUpdate(
    req.params.id,
    { status: "completed" },
    { new: true }
  ).populate("user");

  await sendMail(
    order.user.email,
    "Order Completed - HomeServe",
    `Hi ${order.user.name}, your service is COMPLETED 🎉`
  );

  res.json(order);
});

export default router;
