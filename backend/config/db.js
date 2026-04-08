// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("✅ MongoDB Connected");
//   } catch (error) {
//     console.error("❌ MongoDB Error:", error.message);
//     process.exit(1);
//   }
// };

// export default connectDB;


// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI, {
//       dbName: "salonDB", // 👈 apna DB name yaha set kar
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error("❌ MongoDB Error:", error.message);

//     // Retry logic (auto reconnect after 5 sec)
//     setTimeout(connectDB, 5000);

//     // Optional: exit if needed
//     // process.exit(1);
//   }
// };

// /* ===== CONNECTION EVENTS ===== */
// mongoose.connection.on("connected", () => {
//   console.log("🟢 Mongoose Connected");
// });

// mongoose.connection.on("error", (err) => {
//   console.log("🔴 Mongoose Error:", err);
// });

// mongoose.connection.on("disconnected", () => {
//   console.log("🟡 Mongoose Disconnected");
// });

// export default connectDB; 


import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Error:", error.message);
    process.exit(1);
  }
};

export default connectDB;