import { useState } from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

const DynamicPieChart = ({data:jj}) => {
  const max = 150;
  const data = [
    { name: "Daily Streak", value: Math.min(jj?.[7]?.daySummation, max) },
    { name: "Remaining minutes", value: max - Math.min(jj?.[7]?.daySummation, max) },
  ];
  const COLORS = ["#0088FE", "#FFBB28"];

  return (



      <ResponsiveContainer width="100%" height={600}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            label={({ name, value }) => `${name}: ${value}`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>


      
  );
};

export default DynamicPieChart;
