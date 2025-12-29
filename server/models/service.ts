
// import { RequestHandler } from "express";

// // Mock services data (in production, fetch from MongoDB)
// const mockServices = [
//   {
//     id: "1",
//     name: "Plumbing Repairs",
//     category: "Plumbing",
//     description: "Professional plumbing repairs for pipes, faucets, and leaks",
//     price: 150,
//     rating: 4.8,
//     reviews: 342,
//     duration: "2-3 hours",
//   },
//   {
//     id: "2",
//     name: "Electrical Repair",
//     category: "Electrical",
//     description: "Expert electrical repair, wiring, and safety inspection services",
//     price: 180,
//     rating: 4.7,
//     reviews: 298,
//     duration: "1-2 hours",
//   },
//   {
//     id: "3",
//     name: "AC Repair & Maintenance",
//     category: "HVAC",
//     description: "Air conditioning repair, servicing, and maintenance",
//     price: 200,
//     rating: 4.9,
//     reviews: 521,
//     duration: "1.5-2 hours",
//   },
//   {
//     id: "4",
//     name: "Home Cleaning",
//     category: "Cleaning",
//     description: "Deep cleaning, regular maintenance, and eco-friendly cleaning services",
//     price: 120,
//     rating: 4.6,
//     reviews: 892,
//     duration: "2-4 hours",
//   },
//   {
//     id: "5",
//     name: "Painting Service",
//     category: "Painting",
//     description: "Interior and exterior painting with high-quality finishes",
//     price: 250,
//     rating: 4.7,
//     reviews: 445,
//     duration: "4-8 hours",
//   },
//   {
//     id: "6",
//     name: "Carpentry Work",
//     category: "Carpentry",
//     description: "Custom carpentry, furniture repair, and wood finishing",
//     price: 160,
//     rating: 4.8,
//     reviews: 367,
//     duration: "2-6 hours",
//   },
//   {
//     id: "7",
//     name: "Pest Control",
//     category: "Pest Control",
//     description: "Safe and effective pest control treatments for all types of pests",
//     price: 140,
//     rating: 4.5,
//     reviews: 278,
//     duration: "1-2 hours",
//   },
//   {
//     id: "8",
//     name: "Locksmith Service",
//     category: "Security",
//     description: "Emergency locksmith, lock repair, and key duplication",
//     price: 100,
//     rating: 4.9,
//     reviews: 612,
//     duration: "30-60 minutes",
//   },
//   {
//     id: "9",
//     name: "Flooring Installation",
//     category: "Flooring",
//     description: "Hardwood, laminate, tile, and carpet installation",
//     price: 300,
//     rating: 4.8,
//     reviews: 234,
//     duration: "6-12 hours",
//   },
//   {
//     id: "10",
//     name: "Window Cleaning",
//     category: "Cleaning",
//     description: "Professional window cleaning for houses and offices",
//     price: 100,
//     rating: 4.6,
//     reviews: 445,
//     duration: "1-2 hours",
//   },
//   {
//     id: "11",
//     name: "Handyman Services",
//     category: "General",
//     description: "General repairs, maintenance, and small home improvement projects",
//     price: 130,
//     rating: 4.7,
//     reviews: 556,
//     duration: "1-3 hours",
//   },
//   {
//     id: "12",
//     name: "Garden & Landscaping",
//     category: "Landscaping",
//     description: "Garden design, maintenance, and landscaping services",
//     price: 170,
//     rating: 4.6,
//     reviews: 389,
//     duration: "2-4 hours",
//   },
// ];

// export const handleGetServices: RequestHandler = (req, res) => {
//   try {
//     const { category, search } = req.query;

//     let services = mockServices;

//     // Filter by category if provided
//     if (category && typeof category === "string") {
//       services = services.filter(
//         (service) => service.category.toLowerCase() === category.toLowerCase()
//       );
//     }

//     // Filter by search query if provided
//     if (search && typeof search === "string") {
//       const searchLower = search.toLowerCase();
//       services = services.filter(
//         (service) =>
//           service.name.toLowerCase().includes(searchLower) ||
//           service.description.toLowerCase().includes(searchLower)
//       );
//     }

//     res.json({
//       success: true,
//       data: services,
//       count: services.length,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: "Failed to fetch services",
//     });
//   }
// };

// export const handleGetServiceById: RequestHandler = (req, res) => {
//   try {
//     const { id } = req.params;
//     const service = mockServices.find((s) => s.id === id);

//     if (!service) {
//       res.status(404).json({
//         success: false,
//         error: "Service not found",
//       });
//       return;
//     }

//     res.json({
//       success: true,
//       data: service,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: "Failed to fetch service",
//     });
//   }
// };









// server/models/service.ts
import mongoose, { Schema, Document } from "mongoose";


// Interface define karo
export interface IService extends Document {
  title: string;
  description: string;
  price: number;
  duration: number; // minutes mein
  image?: string;
  category?: string;
  available?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Schema banao
const ServiceSchema = new Schema<IService>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: Number, required: true },
    image: { type: String },
    category: { type: String },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Model banao
const ServiceModel = mongoose.model<IService>("Service", ServiceSchema);

// DEFAULT EXPORT karo (yeh zaruri hai!)
export default ServiceModel;