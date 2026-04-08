
import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    service: { type: String, required: true },
    stylist: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
  },
  { timestamps: true }
);

// ✅ Prevent double booking (same stylist + date + time)
appointmentSchema.index(
  { stylist: 1, date: 1, time: 1 },
  { unique: true }
);

export default mongoose.model("Appointment", appointmentSchema);