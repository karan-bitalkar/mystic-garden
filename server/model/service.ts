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

const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String },
  price: { type: Number, required: true },
  description: { type: String },
});

export const Service =
  mongoose.models.Service ||
  mongoose.model("Service", ServiceSchema);
