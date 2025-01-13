"use client";
import React from "react";
import ShowBarChart from "../components/ShowBarChart";
import ShowAreaChart from "../components/ShowAreaChart";
import { useSelector } from "react-redux";
import useFocusAndStreakData from "../hooks/useFocusAndStreakData";
import DynamicPieChart from "../components/DynamicPieChart";
import CurrentVsLongestStreak from "../components/CurrentVsLongestStreak";


const Dashboard = () => {
const data2 = useFocusAndStreakData()
  const { focusData, loading, error } = useSelector((state) => state.focusData);
  const { streakData, loading:streakLoading, error:streakError } = useSelector((state) => state.streakData);
  const user = JSON.parse(localStorage.getItem("loggedInUser"))
  

  return <div className="grid grid-cols-2 border-2 border-red-500">
    <div>
    <ShowBarChart data={focusData.last8Days}></ShowBarChart>
    </div>
    <div>
    <ShowAreaChart data={focusData.last8Days}></ShowAreaChart>
    </div>
    <div>
    <DynamicPieChart data={focusData.last8Days}></DynamicPieChart>
    </div>
    <div>
    <CurrentVsLongestStreak data2={streakData}></CurrentVsLongestStreak>
    </div>
  </div>;
};

export default Dashboard;
