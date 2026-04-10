

import express from "express";
import DailyEntry from "../models/DailyEntry.js";

const router = express.Router();

/* GET ALL DATA */
router.get("/all", async (req, res) => {
  try {
    const data = await DailyEntry.find().sort({ date: -1 });
    res.json(data);
  } catch (err) {
    console.log("GET ALL Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/* GET BY DATE */
router.get("/:date", async (req, res) => {
  try {
    const data = await DailyEntry.findOne({
      date: req.params.date.trim(),
    });

    res.json(data || null);
  } catch (err) {
    console.log("GET Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/* SAVE / UPDATE (Upsert) */
router.post("/", async (req, res) => {
  try {
    const { date, openingAmount, closingAmount, clients } = req.body;

    const updatedEntry = await DailyEntry.findOneAndUpdate(
      { date: date.trim() },
      {
        date: date.trim(),
        openingAmount: Number(openingAmount) || 0,
        closingAmount: Number(closingAmount) || 0,
        clients: clients || [],
      },
      {
        new: true,
        upsert: true,
      }
    );

    res.json({
      message: "Saved Successfully ✅",
      data: updatedEntry,
    });
  } catch (err) {
    console.log("POST Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;