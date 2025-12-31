import { Service } from './../../client/lib/mockData';
 // server/routes/service.ts
  import { RequestHandler } from "express";
  import Service from "../models/service";  // ← YEH SAHI IMPORT HAI (models se)

  export const handleGetServices: RequestHandler = async (_req, res) => {
    try {
      const services = await Service.find();
      res.json(services);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching services" });
    }
  };

  export const handleGetServiceById: RequestHandler = async (req, res) => {
    try {
      const service = await Service.findById(req.params.id);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.json(service);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching service" });
    }
  };


