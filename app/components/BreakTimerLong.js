"use client";
import { useTimer } from "react-timer-hook";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useDispatch, useSelector } from "react-redux";
import { fetchFocusData } from "../redux-toolkit/Slices/FocusData";
import { fetchStreakData } from "../redux-toolkit/Slices/streakData";
import { useEffect, useState } from "react";

const BreakTimerLong= ({setTymerTime}) => {
  // console.log("time span: ",timeSpan)
  const expiryTimestamp = new Date();
  // const [exTimeSpan,setExTimeSpan] = useState()
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.userData);
  const axiosPublic = useAxiosPublic();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 7); // Timer span
// console.log(expiryTimestamp)
  const sessionCompleted = async () => {
    console.log("Long break completed");
    setTymerTime("focus-session")
  };

  const { seconds, minutes, isRunning, pause, resume, restart } = useTimer({
    expiryTimestamp,
    autoStart: false,
    onExpire: () => sessionCompleted(),
  });

  const reset = () => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 7);
    restart(time);
    pause();
  };

  return (
    <>
      {/* Buttons above the timer */}
      <h1 className="text-4xl font-bold mb-4">LONG BREAK</h1>
      <div className="flex justify-center items-center text-8xl font-mono space-x-2 bg-gray-700 p-6 rounded-lg shadow-lg">
        <span>{String(minutes).padStart(2, "0")}</span>
        <span className="text-gray-400">:</span>
        <span>{String(seconds).padStart(2, "0")}</span>
      </div>
      <p className="mt-4 text-lg">
        Long break is
        {isRunning ? (
          <span className="text-green-400"> Running</span>
        ) : (
          <span className="text-red-400"> Paused</span>
        )}
      </p>
      <div className="mt-6 flex space-x-4">
        <button
          onClick={resume}
          className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition duration-300"
        >
          Start
        </button>
        <button
          onClick={pause}
          className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg shadow-md transition duration-300"
        >
          Pause
        </button>
        <button
          onClick={reset}
          className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition duration-300"
        >
          Restart
        </button>
      </div>
    </>
  );
};

export default BreakTimerLong;
