import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { day: "Mon", amount: 2000 },
  { day: "Tue", amount: 3500 },
  { day: "Wed", amount: 2800 },
  { day: "Thu", amount: 5000 },
  { day: "Fri", amount: 4200 },
];

export default function EarningsGraph() {
  return (
    <div className="bg-zinc-900 p-4 rounded-xl">
      <h2 className="mb-4 text-lg font-semibold">Weekly Earnings</h2>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="day" stroke="#aaa" />
          <YAxis stroke="#aaa" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#eab308"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
