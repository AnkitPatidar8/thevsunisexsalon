
import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  name: String,
  employee: String,
  time: String,
  paymentMode: String,
  amount: Number,
});

const dailyEntrySchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true },
  openingAmount: Number,
  closingAmount: Number,
  clients: [clientSchema],
});

export default mongoose.model("DailyEntry", dailyEntrySchema);