

import { useEffect, useState } from "react";
import { CalendarCheck, IndianRupee, Users, TrendingUp } from "lucide-react";
import API from "../config/api";

export default function StatsCards() {

  const [totalBookings, setTotalBookings] = useState(0);
  const [todayRevenue, setTodayRevenue] = useState(0);

  useEffect(() => {

    const today = new Date().toISOString().split("T")[0];

    // Total Appointments
    fetch(`${API}/api/appointments`)
      .then((res) => res.json())
      .then((data) => {
        setTotalBookings(data.length);
      });

    // Today Business (Calculation.jsx data)
    fetch(`${API}/api/daily/${today}`)
      .then((res) => res.json())
      .then((data) => {

        if (!data || !data.clients) {
          setTodayRevenue(0);
          return;
        }

        const total = data.clients.reduce(
          (sum, c) => sum + Number(c.amount || 0),
          0
        );

        setTodayRevenue(total);

      })
      .catch(() => setTodayRevenue(0));

  }, []);

  const cards = [
    {
      title: "Total Bookings",
      value: totalBookings,
      icon: <CalendarCheck size={28} />,
    },
    {
      title: "Today Revenue",
      value: `₹${todayRevenue}`,
      icon: <IndianRupee size={28} />,
    },
    {
      title: "Total Clients",
      value: totalBookings,
      icon: <Users size={28} />,
    },
    {
      title: "Growth",
      value: "+12%",
      icon: <TrendingUp size={28} />,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

      {cards.map((card, index) => (

        <div
          key={index}
          className="bg-zinc-900 p-5 rounded-2xl text-white shadow hover:scale-105 transition"
        >

          <div className="flex justify-between items-center">
            <h3 className="text-sm text-gray-400">
              {card.title}
            </h3>

            <div className="text-yellow-500">
              {card.icon}
            </div>
          </div>

          <p className="text-2xl font-bold mt-3">
            {card.value}
          </p>

        </div>

      ))}

    </div>
  );
}