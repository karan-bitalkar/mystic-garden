// import mongoose from "mongoose";

// export const connectDB = async () => {
//   try {
//     if (!process.env.MONGO_URI) {
//       throw new Error("MONGO_URI is not defined in .env");
//     }

//     await mongoose.connect(process.env.MONGO_URI, {
//       tls: true, // Atlas requires TLS
//     });

//     console.log("MongoDB connected ✅");
//   } catch (error) {
//     console.error("MongoDB connection failed ❌", error);
//     process.exit(1);
//   }
// };import mongoose from "mongoose";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("✅ MongoDB connected");
    console.log("👉 USING DB:", process.env.MONGO_URI);
  } catch (error: any) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
