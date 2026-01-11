  // import { RequestHandler } from "express";



  // // Get all services
  // export const handleGetServices: RequestHandler = async (req, res) => {
  //   try {
  //     const { category, search } = req.query;
  //     const filter: any = {};

  //     if (category) filter.category = { $regex: category, $options: "i" };
  //     if (search) filter.name = { $regex: search, $options: "i" };

  //     const services = await Service.find(filter);
  //     res.json({ success: true, data: services, count: services.length });
  //   } catch (error) {
  //     res.status(500).json({ success: false, error: "Failed to fetch services" });
  //   }
  // };

  // // Get service by ID
  // export const handleGetServiceById: RequestHandler = async (req, res) => {
  //   try {
  //     const service = await Service.findById(req.params.id);
  //     if (!service) return res.status(404).json({ success: false, error: "Service not found" });
  //     res.json({ success: true, data: service });
  //   } catch (error) {
  //     res.status(500).json({ success: false, error: "Failed to fetch service" });
  //   }
  // };  
import mongoose from "mongoose";
import { RequestHandler } from "express";
import { Service } from "../models/Service";

export const handleGetServices: RequestHandler = async (_req, res) => {
  try {
    const services = await Service.find();
    res.json({ success: true, data: services });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch services" });
  }
};

export const handleGetServiceById: RequestHandler = async (req, res) => {
  try {
    const rawId = req.params.id?.trim(); // 🔥 MAIN FIX

    if (!rawId || !mongoose.Types.ObjectId.isValid(rawId)) {
      return res.status(400).json({
        success: false,
        error: "Invalid Service ID",
      });
    }

    const service = await Service.findById(rawId);

    if (!service) {
      return res.status(404).json({
        success: false,
        error: "Service not found",
      });
    }

    return res.json({
      success: true,
      data: service,
    });
  } catch (error) {
    console.error("SERVICE FETCH ERROR:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to fetch service",
    });
  }
};
