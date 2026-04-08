import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
    unique: true, // ek date ka ek record
  },
  expenses: [
    {
      amount: Number,
      reason: String,
      time: String,
    },
  ],
});

export default mongoose.model("Expense", expenseSchema);