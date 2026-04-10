// import express from "express";
// import { adminLogin } from "../controllers/adminController.js";

// const router = express.Router();
// router.post("/login", adminLogin);

// export default router;



import express from "express";
import { adminLogin } from "../controllers/adminController.js";

const router = express.Router();

/* LOGIN */
router.post("/login", adminLogin);

export default router;