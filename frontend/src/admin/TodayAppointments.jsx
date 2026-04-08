

import { useEffect, useState } from "react";
import API from "../config/api";

export default function TodayAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/appointments`)
      .then((res) => res.json())
      .then((data) => {

        const today = new Date();
        const localDate =
          today.getFullYear() +
          "-" +
          String(today.getMonth() + 1).padStart(2, "0") +
          "-" +
          String(today.getDate()).padStart(2, "0");

        const filtered = data.filter((item) => item.date === localDate);

        setAppointments(filtered);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Fetch Error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-zinc-900 p-4 sm:p-6 rounded-2xl text-white">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-yellow-500">
          Today's Appointments
        </h2>

        <span className="text-sm text-gray-400">
          {appointments.length} Bookings
        </span>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : appointments.length === 0 ? (
        <p className="text-gray-400">No bookings today</p>
      ) : (
        <div className="space-y-3">

          {appointments.map((item) => (
            <div
              key={item._id}
              className="bg-zinc-800 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 hover:bg-zinc-700 transition"
            >
              {/* Client Info */}
              <div>
                <p className="font-semibold text-base">
                  {item.name}
                </p>

                <p className="text-sm text-gray-400">
                  {item.service} • {item.stylist}
                </p>
              </div>

              {/* Time */}
              <div className="text-sm text-gray-300 sm:text-right">
                {item.time}
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}