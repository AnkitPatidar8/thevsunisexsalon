// import express from "express";
// import { adminLogin } from "../controllers/adminController.js";

// const router = express.Router();
// router.post("/login", adminLogin);

// export default router;



import express from "express";
import { adminLogin } from "../controllers/adminController.js";

const router = express.Router();

/* ===== ADMIN AUTH ROUTES ===== */

// 🔐 Admin Login
router.post("/login", adminLogin);

export default router;