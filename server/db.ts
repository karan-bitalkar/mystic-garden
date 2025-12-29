// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();

// const DB_URL = process.env.MONGO_URI || ""; // aapki .env me url hona chahiye

// export const connectDB = async () => {
//   try {
//     await mongoose.connect(DB_URL);
//     console.log("MongoDB connected successfully ✅");
//   } catch (error) {
//     console.error("MongoDB connection failed ❌", error);
//     process.exit(1);
//   }
// };

// import mongoose from "mongoose";

// export const connectDB = async () => {
//   try {
//     if (!process.env.MONGO_URI) {
//       throw new Error("MONGO_URI is not defined in .env");
//     }

//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("MongoDB connected ✅");
//   } catch (error) {
//     console.error("MongoDB connection failed ❌", error);
//     process.exit(1);
//   }
// };


import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in .env");
    }

    await mongoose.connect(process.env.MONGO_URI, {
      tls: true, // Atlas requires TLS
    });

    console.log("MongoDB connected ✅");
  } catch (error) {
    console.error("MongoDB connection failed ❌", error);
    process.exit(1);
  }
};
