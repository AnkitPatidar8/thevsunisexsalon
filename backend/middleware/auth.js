// import jwt from "jsonwebtoken";

// export const verifyAdmin = (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];

//     if (!token) {
//       return res.status(401).json({ msg: "No token, access denied" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     if (decoded.role !== "admin") {
//       return res.status(403).json({ msg: "Not authorized" });
//     }

//     next();
//   } catch (err) {
//     return res.status(401).json({ msg: "Invalid token" });
//   }
// };

import jwt from "jsonwebtoken";

export const verifyAdmin = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // ❌ No header
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        msg: "No token, access denied",
      });
    }

    // format: Bearer TOKEN
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        msg: "Invalid token format",
      });
    }

    // 🔐 verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔐 role check
    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        msg: "Not authorized",
      });
    }

    // ✅ attach user (future use)
    req.admin = decoded;

    next();

  } catch (err) {
    console.error("🔥 Auth Error:", err.message);

    return res.status(401).json({
      success: false,
      msg: "Invalid or expired token",
    });
  }
};