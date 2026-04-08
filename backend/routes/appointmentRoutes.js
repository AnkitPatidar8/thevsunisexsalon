

import express from "express";
import {
  createAppointment,
  getAppointments,
  getBookedSlots,
} from "../controllers/appointmentController.js";

const router = express.Router();

router.post("/", createAppointment);
router.get("/", getAppointments);

// ✅ NEW ROUTE
router.get("/booked", getBookedSlots);

export default router;