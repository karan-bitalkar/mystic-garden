import { Router } from "express";
import Booking from "../models/Booking";
import User from "../models/User";
import Service from "../models/service";

const router = Router();

router.get("/stats", async (_req, res) => {
  const totalOrders = await Booking.countDocuments();
  const pendingOrders = await Booking.countDocuments({ status: "pending" });
  const completedOrders = await Booking.countDocuments({ status: "completed" });
  const totalCustomers = await User.countDocuments();
  const totalServices = await Service.countDocuments();

  res.json({
    totalOrders,
    pendingOrders,
    completedOrders,
    totalCustomers,
    totalServices,
  });
});

export default router;
