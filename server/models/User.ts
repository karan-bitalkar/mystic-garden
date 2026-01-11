// // google 
// import mongoose, { Schema, Document } from "mongoose";

// export interface IUser extends Document {
//   name: string;
//   email: string;
//   phone?: string;
//   password?: string;
//   googleId?: string;
//   provider: "local" | "google";
//   role: "user" | "provider";
// }

// const UserSchema = new Schema<IUser>(
//   {
//     name: { type: String, required: true },

//     email: { type: String, required: true, unique: true },

//     phone: { type: String },

//     password: { type: String },

//     googleId: { type: String },

//     provider: {
//       type: String,
//       enum: ["local", "google"],
//       default: "local",
//     },

//     role: {
//       type: String,
//       enum: ["user", "provider"],
//       default: "user",
//     },
//   },
//   { timestamps: true }
// );

// export const User =
//   mongoose.models.User || mongoose.model<IUser>("User", UserSchema);


import mongoose, { Schema, Document } from "mongoose";



export interface IUser extends Document {
  name: string;
  email: string;
  phone?: string;
  password?: string;
  googleId?: string;
  provider: "local" | "google";
  role: "user" | "provider" | "admin";
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    phone: { type: String },

    password: { type: String },

    googleId: { type: String },

    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    role: {
      type: String,
      enum: ["user", "provider", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

export const User =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
  export default User;
