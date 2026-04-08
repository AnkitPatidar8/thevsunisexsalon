

import express from "express";
import {
  generateWeeklyReport,
  generateMonthlyReport
} from "../controllers/pdfController.js";

const router = express.Router();

router.get("/weekly", generateWeeklyReport);

router.get("/monthly", generateMonthlyReport);

export default router;