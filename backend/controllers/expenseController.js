// import Expense from "../models/Expense.js";

// /* GET Expense by Date */
// export const getExpenseByDate = async (req, res) => {
//   try {
//     const { date } = req.params;

//     const data = await Expense.findOne({ date });

//     res.json(data?.expenses || []);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// /* ADD / UPDATE Expense */
// export const saveExpense = async (req, res) => {
//   try {
//     const { date, expenses } = req.body;

//     let existing = await Expense.findOne({ date });

//     if (existing) {
//       existing.expenses = expenses;
//       await existing.save();
//     } else {
//       await Expense.create({ date, expenses });
//     }

//     res.json({ success: true });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


import Expense from "../models/Expense.js";

/* ===== GET Expense by Date ===== */
export const getExpenseByDate = async (req, res) => {
  try {
    const { date } = req.params;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Date is required",
      });
    }

    const data = await Expense.findOne({ date });

    return res.status(200).json({
      success: true,
      expenses: data?.expenses || [],
    });
  } catch (err) {
    console.error("GET Expense Error:", err.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* ===== ADD / UPDATE Expense ===== */
export const saveExpense = async (req, res) => {
  try {
    const { date, expenses } = req.body;

    /* 🔥 Validation */
    if (!date || !Array.isArray(expenses)) {
      return res.status(400).json({
        success: false,
        message: "Invalid data",
      });
    }

    /* 🔥 UPSERT (BEST METHOD) */
    const updated = await Expense.findOneAndUpdate(
      { date },
      { $set: { expenses } },
      {
        new: true,
        upsert: true, // agar nahi mila to create karega
      }
    );

    return res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (err) {
    console.error("POST Expense Error:", err.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};