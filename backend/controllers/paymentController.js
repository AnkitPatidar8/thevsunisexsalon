
import Payment from "../models/Payment.js";

/* MONTHLY REPORT */

export const getMonthlyPayments = async (req, res) => {
  try {

    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();

    const payments = await Payment.find();

    let cash = 0;
    let upi = 0;

    const monthly = payments.filter((p) => {

      const d = new Date(p.date);

      return d.getMonth() === month && d.getFullYear() === year;

    });

    monthly.forEach((p) => {

      if (p.method === "Cash") {
        cash += Number(p.amount);
      }

      if (p.method === "UPI") {
        upi += Number(p.amount);
      }

    });

    res.json({
      cash,
      upi,
      total: cash + upi,
      count: monthly.length,
      data: monthly
    });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
};


/* ALL PAYMENTS */

export const getAllPayments = async (req, res) => {
  try {

    const payments = await Payment.find().sort({ createdAt: -1 });

    res.json(payments);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
};