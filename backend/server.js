
// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import connectDB from "./config/db.js";

// import appointmentRoutes from "./routes/appointmentRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";
// import dailyRoutes from "./routes/dailyRoutes.js";
// import pdfRoutes from "./routes/pdfRoutes.js";
// import paymentRoutes from "./routes/paymentRoutes.js";
// import instagramRoutes from "./routes/instagramRoutes.js";


// dotenv.config();
// connectDB();

// const app = express();

// /* Middleware */
// app.use(cors());
// app.use(express.json());

// /* Routes */
// app.use("/api/appointments", appointmentRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/daily", dailyRoutes);
// app.use("/api/payments", paymentRoutes);
// app.use("/api", instagramRoutes);

// app.use("/api/pdf", pdfRoutes);

// app.get("/", (req, res) => {
//   res.send("Backend running");
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`,);
//   console.log("ENV CHECK 👉", process.env.EMAIL_USER);
// });


// import "dotenv/config"; // 🔥 सबसे ऊपर (BEST FIX)

// import express from "express";
// import cors from "cors";
// import connectDB from "./config/db.js";

// import appointmentRoutes from "./routes/appointmentRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";
// import dailyRoutes from "./routes/dailyRoutes.js";
// import pdfRoutes from "./routes/pdfRoutes.js";
// import paymentRoutes from "./routes/paymentRoutes.js";
// import instagramRoutes from "./routes/instagramRoutes.js";
// import expenseRoutes from "./routes/expenseRoutes.js";

// // ✅ DB connect
// connectDB();

// const app = express();

// /* Middleware */
// app.use(cors());
// app.use(express.json());

// /* Debug ENV 🔥 */


// /* Routes */
// app.use("/api/appointments", appointmentRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/daily", dailyRoutes);
// app.use("/api/payments", paymentRoutes);
// app.use("/api", instagramRoutes);
// app.use("/api/pdf", pdfRoutes);
// app.use("/api", expenseRoutes);

// app.get("/", (req, res) => {
//   res.send("Backend running 🚀");
// });

// /* Server */
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });


import "dotenv/config";

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import appointmentRoutes from "./routes/appointmentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import dailyRoutes from "./routes/dailyRoutes.js";
import pdfRoutes from "./routes/pdfRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import instagramRoutes from "./routes/instagramRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";

/* ===== INIT ===== */
const app = express();

/* ===== DB CONNECT ===== */
connectDB();

/* ===== MIDDLEWARE ===== */
app.use(cors());
app.use(express.json());

/* ===== DEBUG LOGGER (IMPORTANT) ===== */
app.use((req, res, next) => {
 
});

/* ===== ROUTES ===== */
app.use("/api/appointments", appointmentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/daily", dailyRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/pdf", pdfRoutes);

/* 🔥 IMPORTANT: Keep generic routes LAST */
app.use("/api/instagram", instagramRoutes);
app.use("/api/expense", expenseRoutes);

/* ===== ROOT ===== */
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

/* ===== 404 HANDLER (VERY IMPORTANT) ===== */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found ❌",
  });
});

/* ===== ERROR HANDLER ===== */
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

/* ===== SERVER ===== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});