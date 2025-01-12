import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const ShowAreaChart = ({data}) => {
    const chartData = data.slice(1).map((item) => ({
        date: item.date,
        summation: item.daySummation
      }));
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Day Summation by Date</h2>
      
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={chartData} className="rounded-lg shadow-xl">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area 
            type="monotone" 
            dataKey="summation" 
            stroke="#4C51BF" 
            fill="#4C51BF" 
            fillOpacity={0.3} 
            strokeWidth={3} 
            dot={{ r: 5, fill: '#4C51BF' }} 
          />
        </AreaChart>
      </ResponsiveContainer>
      
      <p className="text-center text-sm text-gray-500 mt-4">Visualizing the summation of data by date</p>
    </div>
    );
};

export default ShowAreaChart;