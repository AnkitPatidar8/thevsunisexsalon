
export const createEntry = async (req, res) => {
  try {
    const { date, cash, upi } = req.body;

    const total = Number(cash) + Number(upi);

    const entry = await DailyEntry.create({
      date,
      cash,
      upi,
      total,
    });

    res.status(201).json(entry);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};