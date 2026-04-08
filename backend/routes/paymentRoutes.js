
import express from "express";
import { getMonthlyPayments, getAllPayments } from "../controllers/paymentController.js";

const router = express.Router();

router.get("/monthly", getMonthlyPayments);
router.get("/all", getAllPayments);

export default router;