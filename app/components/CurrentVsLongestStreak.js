import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from "recharts";

const CurrentVsLongestStreak = ({data2}) => {

  const remainingStreak = data2?.longestStreak - data2?.currentStreak;

  // Data for the chart
  const data = [
    {
      name: "Current Streak",
      value: data2?.currentStreak,
      fill: "#00C49F",
    },
    {
      name: "Remaining Streak",
      value: remainingStreak,
      fill: "#FF8042",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">Streak Comparison</h1>
      {/* Responsive Container for the RadialBarChart */}
      <ResponsiveContainer width="100%" height={400}>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="20%"
          outerRadius="90%"
          barSize={20}
          data={data}
        >
          <RadialBar
            minAngle={15}
            label={{ position: "insideStart", fill: "#fff" }}
            background
            clockWise
            dataKey="value"
          />
          <Legend
            iconSize={20}
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
          />
        </RadialBarChart>
      </ResponsiveContainer>

      {/* Streak Details */}
      <div className="mt-4 text-gray-700">
        <p>Current Streak: {data2?.currentStreak}</p>
        <p>Streak Difference: {remainingStreak}</p>
        <p>Longest Streak: {data2?.longestStreak}</p>
      </div>
    </div>
  );
};

export default CurrentVsLongestStreak;
