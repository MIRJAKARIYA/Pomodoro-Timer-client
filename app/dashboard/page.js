"use client";
import React from "react";
import ShowBarChart from "../components/ShowBarChart";
import ShowAreaChart from "../components/ShowAreaChart";
import { useSelector } from "react-redux";
import useFocusAndStreakData from "../hooks/useFocusAndStreakData";


const Dashboard = () => {
const data2 = useFocusAndStreakData()
  const { focusData, loading, error } = useSelector((state) => state.focusData);
  const { streakData, loading:streakLoading, error:streakError } = useSelector((state) => state.streakData);


  return <div>
    <ShowBarChart data={focusData.last8Days}></ShowBarChart>
    <ShowAreaChart data={focusData.last8Days}></ShowAreaChart>
  </div>;
};

export default Dashboard;
