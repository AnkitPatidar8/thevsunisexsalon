// import express from "express";
// import {
//   getExpenseByDate,
//   saveExpense,
// } from "../controllers/expenseController.js";

// const router = express.Router();

// router.get("/expense/:date", getExpenseByDate);
// router.post("/expense", saveExpense);

// export default router;

// import express from "express";
// import {
//   getExpenseByDate,
//   saveExpense,
// } from "../controllers/expenseController.js";

// const router = express.Router();

// /* ===== GET EXPENSE BY DATE ===== */
// router.get("/expense/:date", async (req, res) => {
//   try {
//     await getExpenseByDate(req, res);
//   } catch (error) {
//     console.error("GET Expense Error:", error.message);
//     res.status(500).json({ error: "Server Error" });
//   }
// });

// /* ===== ADD / UPDATE EXPENSE ===== */
// router.post("/expense", async (req, res) => {
//   try {
//     const { date, expenses } = req.body;

//     // 🔥 Basic Validation
//     if (!date || !Array.isArray(expenses)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid data format",
//       });
//     }

//     await saveExpense(req, res);
//   } catch (error) {
//     console.error("POST Expense Error:", error.message);
//     res.status(500).json({ error: "Server Error" });
//   }
// });

// /* ===== OPTIONAL DELETE SINGLE EXPENSE ===== */
// // router.delete("/expense/:date/:index", deleteExpense);

// export default router;



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

