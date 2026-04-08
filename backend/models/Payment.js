
import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: true,
    },

    method: {
      type: String,
      enum: ["Cash", "UPI"],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    date: {
      type: String,
      required: true,
      index: true
    },

    time: {
      type: String,
      default: () => new Date().toLocaleTimeString(),
    },

    stylist: {
      type: String,
      default: "",
    },

    service: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Payment =
  mongoose.models.Payment || mongoose.model("Payment", paymentSchema);

export default Payment; 