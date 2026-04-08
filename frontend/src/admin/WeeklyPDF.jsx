

import { useState } from "react";
import API from "../config/api";

export default function WeeklyPDF() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const downloadWeekly = () => {
    if (!start || !end) return alert("Select dates");

    window.open(
      `${API}/pdf/weekly?start=${start}&end=${end}`,
      "_blank"
    );
  };

  return (
    <div className="bg-zinc-900 p-4 sm:p-6 rounded-2xl text-white">

      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-yellow-500">
        Weekly Report
      </h2>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">

        <input
          type="date"
          className="p-2 rounded bg-black text-white border border-zinc-700"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />

        <input
          type="date"
          className="p-2 rounded bg-black text-white border border-zinc-700"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />

      </div>

      <button
        onClick={downloadWeekly}
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded-lg transition"
      >
        Download Weekly PDF
      </button>

    </div>
  );
}
