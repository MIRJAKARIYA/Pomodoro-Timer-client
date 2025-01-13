

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const ShowBarChart = ({data}) => {
    const chartData = data?.slice(1)?.map((item) => ({
        date: item.date,
        sessions: item.dayNumberOfSessions
      }));
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Sessions by Date</h2>
        
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} className="rounded-lg shadow-xl">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sessions" fill="#4C51BF" radius={8} />
          </BarChart>
        </ResponsiveContainer>
        
        <p className="text-center text-sm text-gray-500 mt-4">Data representation of daily sessions</p>
      </div>
    );
};

export default ShowBarChart;