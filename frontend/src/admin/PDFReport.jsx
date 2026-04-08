

import { useState } from "react";
import API from "../config/api";

export default function PDFReport() {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const downloadReport = () => {
    if (!month || !year) return alert("Select Month and Year");

    window.open(
      `${API}/pdf/monthly?month=${month}&year=${year}`,
      "_blank"
    );
  };

  return (
    <div className="bg-zinc-900 p-4 sm:p-6 rounded-2xl text-white">

      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-yellow-500">
        Monthly Report
      </h2>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">

        <input
          type="number"
          placeholder="Month (1-12)"
          className="p-2 rounded bg-black text-white border border-zinc-700"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />

        <input
          type="number"
          placeholder="Year"
          className="p-2 rounded bg-black text-white border border-zinc-700"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

      </div>

      <button
        onClick={downloadReport}
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded-lg transition"
      >
        Download Monthly PDF
      </button>

    </div>
  );
}