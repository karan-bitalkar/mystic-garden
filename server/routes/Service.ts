// server/routes/Service.ts
import { RequestHandler } from "express";
import { Service } from "../models/service"; // ✅ ONLY THIS IMPORT

// Get all services
export const handleGetServices: RequestHandler = async (_req, res) => {
  try {
    const services = await Service.find();
    res.json({
      success: true,
      data: services,
      count: services.length,
    });
  } catch (error) {
    console.error("GET SERVICES ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching services",
    });
  }
};

// Get service by ID
export const handleGetServiceById: RequestHandler = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.json({
      success: true,
      data: service,
    });
  } catch (error) {
    console.error("GET SERVICE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching service",
    });
  }
};
