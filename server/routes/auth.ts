// import { RequestHandler } from "express";
// import { mockUsers } from "../index";

// // Mock session storage
// const sessions: Map<string, any> = new Map();

// export const handleRegister: RequestHandler = (req, res) => {
//   try {
//     const { name, email, phone, password, confirmPassword } = req.body;

//     // Validate input
//     if (!name || !email || !phone || !password || !confirmPassword) {
//       res.status(400).json({
//         success: false,
//         error: "All fields are required",
//       });
//       return;
//     }

//     if (password !== confirmPassword) {
//       res.status(400).json({
//         success: false,
//         error: "Passwords do not match",
//       });
//       return;
//     }

//     if (password.length < 8) {
//       res.status(400).json({
//         success: false,
//         error: "Password must be at least 8 characters",
//       });
//       return;
//     }

//     // Check if user already exists
//     if (mockUsers.some((u) => u.email === email)) {
//       res.status(400).json({
//         success: false,
//         error: "Email already registered",
//       });
//       return;
//     }

//     // Create new user (in production, hash password with bcryptjs)
//     const newUser = {
//       id: `user_${Date.now()}`,
//       name,
//       email,
//       phone,
//       password, // In production: bcrypt.hash(password, 10)
//       role: "user",
//       createdAt: new Date().toISOString(),
//     };

//     mockUsers.push(newUser);

//     // Create session
//     const sessionId = `session_${Date.now()}`;
//     sessions.set(sessionId, {
//       userId: newUser.id,
//       email: newUser.email,
//       createdAt: new Date(),
//     });

//     res.json({
//       success: true,
//       message: "Account created successfully",
//       user: {
//         id: newUser.id,
//         name: newUser.name,
//         email: newUser.email,
//         role: newUser.role,
//       },
//       sessionId,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: "Failed to register user",
//     });
//   }
// };

// export const handleLogin: RequestHandler = (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Validate input
//     if (!email || !password) {
//       res.status(400).json({
//         success: false,
//         error: "Email and password are required",
//       });
//       return;
//     }

//     // Find user (in production: verify password with bcryptjs)
//     const user = mockUsers.find((u) => u.email === email);

//     if (!user || user.password !== password) {
//       res.status(401).json({
//         success: false,
//         error: "Invalid email or password",
//       });
//       return;
//     }

//     // Create session
//     const sessionId = `session_${Date.now()}`;
//     sessions.set(sessionId, {
//       userId: user.id,
//       email: user.email,
//       createdAt: new Date(),
//     });

//     res.json({
//       success: true,
//       message: "Login successful",
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//       sessionId,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: "Failed to login",
//     });
//   }
// };

// export const handleLogout: RequestHandler = (req, res) => {
//   try {
//     const { sessionId } = req.body;

//     if (sessionId) {
//       sessions.delete(sessionId);
//     }

//     res.json({
//       success: true,
//       message: "Logged out successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: "Failed to logout",
//     });
//   }
// };

// export const handleGetCurrentUser: RequestHandler = (req, res) => {
//   try {
//     const sessionId = req.headers["x-session-id"] as string;

//     if (!sessionId || !sessions.has(sessionId)) {
//       res.status(401).json({
//         success: false,
//         error: "Not authenticated",
//       });
//       return;
//     }

//     const session = sessions.get(sessionId);
//     const user = mockUsers.find((u) => u.id === session.userId);

//     if (!user) {
//       res.status(404).json({
//         success: false,
//         error: "User not found",
//       });
//       return;
//     }

//     res.json({
//       success: true,
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: "Failed to fetch current user",
//     });
//   }
// };



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
