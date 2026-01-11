import { Router } from "express";
import User from "../models/User";

const router = Router();

router.get("/", async (_req, res) => {
  const customers = await User.find({ role: "user" });
  res.json({ customers });
});

export default router;
