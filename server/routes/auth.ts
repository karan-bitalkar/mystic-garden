
import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";


const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

// REGISTER
export const handleRegister: RequestHandler = async (req, res) => {
  try {
    const { name, email, phone, password, confirmPassword } = req.body;

    if (!name || !email || !phone || !password || !confirmPassword) {
      return res.status(400).json({ success: false, error: "All fields required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, error: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      success: true,
      message: "Account created",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch {
    res.status(500).json({ success: false, error: "Failed to register" });
  }
};

// LOGIN
export const handleLogin: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch {
    res.status(500).json({ success: false, error: "Failed to login" });
  }
};

// // auth.ts
// import { RequestHandler } from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { User } from "../models/User";

// const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

// // -------------------
// // REGISTER
// // -------------------
// export const handleRegister: RequestHandler = async (req, res) => {
//   try {
//     const { name, email, phone, password, confirmPassword } = req.body;

//     // Validate required fields
//     if (!name || !email || !phone || !password || !confirmPassword) {
//       return res.status(400).json({ success: false, error: "All fields are required" });
//     }

//     // Passwords match check
//     if (password !== confirmPassword) {
//       return res.status(400).json({ success: false, error: "Passwords do not match" });
//     }

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ success: false, error: "Email already registered" });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create user
//     const user = await User.create({
//       name,
//       email,
//       phone,
//       password: hashedPassword,
//       role: "user", // default role
//     });

//     // Generate JWT token
//     const token = jwt.sign(
//       { userId: user._id, role: user.role },
//       JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     // Return success
//     return res.status(201).json({
//       success: true,
//       message: "Account created successfully",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         role: user.role,
//       },
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ success: false, error: "Failed to register" });
//   }
// };

// // -------------------
// // LOGIN
// // -------------------
// export const handleLogin: RequestHandler = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Validate fields
//     if (!email || !password) {
//       return res.status(400).json({ success: false, error: "Email and password are required" });
//     }

//     // Find user
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ success: false, error: "Invalid email or password" });
//     }

//     // Check password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ success: false, error: "Invalid email or password" });
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       { userId: user._id, role: user.role },
//       JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     // Return success
//     return res.json({
//       success: true,
//       message: "Login successful",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         role: user.role,
//       },
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ success: false, error: "Failed to login" });
//   }
// };
