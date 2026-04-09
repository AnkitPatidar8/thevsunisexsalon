// import Admin from "../models/Admin.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// export const adminLogin = async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     const admin = await Admin.findOne({ username });

//     if (!admin) {
//       return res.status(401).json({ msg: "Invalid username or password" });
//     }

//     const isMatch = await bcrypt.compare(password, admin.password);

//     if (!isMatch) {
//       return res.status(401).json({ msg: "Invalid username or password" });
//     }

//     /* JWT TOKEN */

//     const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
//       expiresIn: "1d",
//     });

//     res.json({
//       success: true,
//       token,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ msg: "Server Error" });
//   }
// };

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
  try {
    let { username, password } = req.body;

    // 🔒 safety check
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        msg: "Username and password required",
      });
    }

    username = username.trim();
    password = password.trim();

    // 🔐 check username
    if (username !== process.env.ADMIN_USERNAME) {
      return res.status(401).json({
        success: false,
        msg: "Invalid username or password",
      });
    }

    // 🔐 check password (hashed)
    const isMatch = await bcrypt.compare(
      password,
      process.env.ADMIN_PASSWORD
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        msg: "Invalid username or password",
      });
    }

    // 🎟️ generate token
    const token = jwt.sign(
      { role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      success: true,
      token,
    });

  } catch (error) {
    console.error("🔥 Admin Login Error:", error.message);

    return res.status(500).json({
      success: false,
      msg: "Server Error",
    });
  }
};