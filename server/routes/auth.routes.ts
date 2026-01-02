// import { Router } from "express";
// import { handleRegister, handleLogin } from "../routes/auth";

// const router = Router();

// router.post("/register", handleRegister);
// router.post("/login", handleLogin);

// export default router;

// import { Router, Request, Response } from "express";
// import { handleRegister, handleLogin } from "../routes/auth";

// const router = Router();

// /**
//  * @route   POST /api/auth/register
//  * @desc    Register a new user
//  * @access  Public
//  */
// router.post("/register", async (req: Request, res: Response) => {
//   try {
//     await handleRegister(req, res);
//   } catch (error) {
//     console.error("Register Error:", error);
//     res.status(500).json({ success: false, error: "Internal Server Error" });
//   }
// });

// /**
//  * @route   POST /api/auth/login
//  * @desc    Login user
//  * @access  Public
//  */
// router.post("/login", async (req: Request, res: Response) => {
//   try {
//     await handleLogin(req, res);
//   } catch (error) {
//     console.error("Login Error:", error);
//     res.status(500).json({ success: false, error: "Internal Server Error" });
//   }
// });

// export default router;





import { Router } from "express";
import { handleRegister, handleLogin } from "../routes/auth";

const router = Router();

/**
 * @route   POST /api/auth/register
 * @access  Public
 */
router.post("/register", handleRegister);

/**
 * @route   POST /api/auth/login
 * @access  Public
 */
router.post("/login", handleLogin);

export default router;
