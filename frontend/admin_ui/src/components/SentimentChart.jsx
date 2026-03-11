import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import React from "react";

export default function SentimentChart({ stats }) {

  const data = [
    { name: "Positive", value: stats.positive },
    { name: "Negative", value: stats.negative },
    { name: "Neutral", value: stats.neutral || 0 }
  ];

  const COLORS = ["#22c55e", "#ef4444", "#94a3b8"];

  return (
    <div className="bg-white shadow rounded p-4">

      <h2 className="text-lg font-semibold mb-4">
        Sentiment Distribution
      </h2>

      <PieChart width={350} height={250}>
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>

    </div>
  );
}