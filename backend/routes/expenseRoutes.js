

import express from "express";
import {
  getExpenseByDate,
  saveExpense,
} from "../controllers/expenseController.js";

const router = express.Router();

/* ✅ CLEAN ROUTES */
router.get("/:date", getExpenseByDate);
router.post("/", saveExpense);

export default router;

