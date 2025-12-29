// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, unique: true, required: true },
//   phone: { type: String, required: true },
//   password: { type: String, required: true },
//   role: { type: String, default: "user" },
//   createdAt: { type: Date, default: Date.now },
// });

// export const User = mongoose.model("User", userSchema);


// import mongoose, { Schema, Document } from "mongoose";

// export interface IUser extends Document {
//   name: string;
//   email: string;
//   password: string;
//   role: "user" | "provider";
// }

// const UserSchema = new Schema<IUser>(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     role: {
//       type: String,
//       enum: ["user", "provider"],
//       default: "user",
//     },
//   },
//   { timestamps: true }
// );

// export const User = mongoose.model<IUser>("User", UserSchema);








import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: "user" | "provider";
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true }, // ✅ ADDED
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "provider"],
      default: "user",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", UserSchema);
