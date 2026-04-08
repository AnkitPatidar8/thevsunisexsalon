
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";

dotenv.config();

const createAdmin = async () => {
  try {

    await mongoose.connect(process.env.MONGO_URI);

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    await Admin.create({
      username: process.env.ADMIN_USERNAME,
      password: hashedPassword
    });

    console.log("✅ ADMIN CREATED");

    process.exit();

  } catch (error) {
    console.error("❌ Error creating admin:", error);
    process.exit(1);
  }
};

createAdmin();