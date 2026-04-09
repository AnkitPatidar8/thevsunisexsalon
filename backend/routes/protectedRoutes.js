// import express from "express";
// import { verifyAdmin } from "../middleware/auth.js";

// const router = express.Router();

// router.get("/dashboard", verifyAdmin, (req, res) => {
//   res.json({ msg: "Welcome Admin Dashboard" });
// });

// export default router;

import express from "express";
import { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

/* ===== PROTECTED ADMIN ROUTES ===== */

// 🔐 Dashboard API
router.get("/dashboard", verifyAdmin, (req, res) => {
  res.json({
    success: true,
    msg: "Welcome Admin Dashboard",
  });
});

export default router;