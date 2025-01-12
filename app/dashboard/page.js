"use client";
import React from "react";
import ShowBarChart from "../components/ShowBarChart";
import ShowAreaChart from "../components/ShowAreaChart";


const Dashboard = () => {
  const data = [
    {
      date: "2025-01-05",
      dayNumberOfSessions: 0,
      daySummation: 0,
    },
    {
      date: "2025-01-06",
      dayNumberOfSessions: 2,
      daySummation: 50,
    },
    {
      date: "2025-01-07",
      dayNumberOfSessions: 1,
      daySummation: 25,
    },
    {
      date: "2025-01-08",
      dayNumberOfSessions: 0,
      daySummation: 0,
    },
    {
      date: "2025-01-09",
      dayNumberOfSessions: 0,
      daySummation: 0,
    },
    {
      date: "2025-01-10",
      dayNumberOfSessions: 0,
      daySummation: 0,
    },
    {
      date: "2025-01-11",
      dayNumberOfSessions: 0,
      daySummation: 0,
    },
    {
      date: "2025-01-12",
      dayNumberOfSessions: 4,
      daySummation: 100,
    },
  ];


  return <div>
    <ShowBarChart data={data}></ShowBarChart>
    <ShowAreaChart data={data}></ShowAreaChart>
  </div>;
};

export default Dashboard;
