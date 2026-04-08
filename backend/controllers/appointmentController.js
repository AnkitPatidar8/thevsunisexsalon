

import Appointment from "../models/Appointment.js";
import { addToQueue } from "../utils/whatsappQueue.js";
import nodemailer from "nodemailer";

// ✅ transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ verify connection (startup pe check karega)
transporter.verify((error, success) => {
  if (error) {
    console.log("❌ Email config error:", error.message);
  } else {
    console.log("✅ Email server ready");
  }
});

// ✅ CREATE APPOINTMENT
export const createAppointment = async (req, res) => {
  try {
    const { name, mobile, service, stylist, date, time } = req.body;

    if (!name || !mobile || !service || !stylist || !date || !time) {
      return res.status(400).json({ message: "All fields required" });
    }

    // prevent double booking
    const existing = await Appointment.findOne({ stylist, date, time });

    if (existing) {
      return res.status(400).json({
        message: "This slot is already booked",
      });
    }

    // save
    const newAppointment = await Appointment.create({
      name,
      mobile,
      service,
      stylist,
      date,
      time,
    });

    // 🔥 WhatsApp
    addToQueue({ name, mobile, service, stylist, date, time });

    // 📧 EMAIL SEND (async non-blocking)
    sendAdminMail({ name, mobile, service, stylist, date, time });

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment: newAppointment,
    });

  } catch (error) {
    console.log("❌ Server Error:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        message: "Slot already booked",
      });
    }

    res.status(500).json({ message: "Server error" });
  }
};

// ✅ MAIL FUNCTION (SEPARATE - CLEAN 🔥)
const sendAdminMail = async ({ name, mobile, service, stylist, date, time }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Salon Booking" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "🔥 New Appointment Booked",
      html: `
        <h2>New Booking Received</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Mobile:</b> ${mobile}</p>
        <p><b>Service:</b> ${service}</p>
        <p><b>Stylist:</b> ${stylist}</p>
        <p><b>Date:</b> ${date}</p>
        <p><b>Time:</b> ${time}</p>
      `,
    });

    console.log("📧 Email sent:", info.response);
  } catch (err) {
    console.log("❌ Email Error:", err.message);
  }
};

// ✅ GET ALL
export const getAppointments = async (req, res) => {
  try {
    const data = await Appointment.find().sort({ createdAt: -1 });
    res.json(data);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ GET BOOKED SLOTS
export const getBookedSlots = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: "Date required" });
    }

    const appointments = await Appointment.find({ date });
    const bookedSlots = appointments.map((a) => a.time);

    res.json(bookedSlots);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};