import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import React from "react";
export default function CategoryChart({ data }) {

  return (
    <div className="bg-white shadow rounded p-4">

      <h2 className="text-lg font-semibold mb-4">
        Feedback by Category
      </h2>

      <BarChart width={400} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="category" />
        <YAxis />

        <Tooltip />

        <Bar dataKey="count" fill="#3b82f6" />

      </BarChart>

    </div>
  );
}