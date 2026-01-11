import jwt from "jsonwebtoken";

export const isAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
   const decoded = jwt.verify(
  token,
  process.env.JWT_SECRET as string
) as any;
    if (decoded.role !== "admin") {
      return res.status(403).json({ error: "Admin only" });
    } 
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};
