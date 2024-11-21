import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", price: 4000 },
  { name: "Feb", price: 3000 },
  { name: "Mar", price: 5000 },
  { name: "Apr", price: 4000 },
  { name: "May", price: 6000 },
];

export const SparklineChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="name" stroke="orange" />
        <YAxis stroke="orange" />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="price"
          stroke="orange"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
