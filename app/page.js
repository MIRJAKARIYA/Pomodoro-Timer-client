"use client";
import { useDispatch, useSelector } from "react-redux";
import Timer from "./components/Timer";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchFocusData } from "./redux-toolkit/Slices/FocusData";
import { fetchStreakData } from "./redux-toolkit/Slices/streakData";
import useFocusAndStreakData from "./hooks/useFocusAndStreakData";
import BreakTimerLong from "./components/BreakTimerLong";
import BreakTimerShort from "./components/BreakTimerShort";
export default function Home() {
  const router = useRouter();
  const data2 = useFocusAndStreakData();
  const { focusData, loading, error } = useSelector((state) => state.focusData);
  const {
    streakData,
    loading: streakLoading,
    error: streakError,
  } = useSelector((state) => state.streakData);
  // console.log(streakData);
  const { user } = useSelector((state) => state?.userData);
  const [timerTime, setTymerTime] = useState("focus-session");

  useEffect(() => {
    if (!user?.email) {
      router.push("/sign-in");
    }
  }, [user, router]);

  const handlePromodoro = (type) => {

    setTymerTime(type)
  }
  return (
    <>
      {/* 25 minutes 1500 seconds */}

      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 text-white">
        {/* Buttons above the timer */}
        <div className="mb-6 flex space-x-4">
          <button
            onClick={() => handlePromodoro("focus-session")}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg shadow-md transition duration-300"
          >
            Pomodoro
          </button>
          <button
            onClick={() => handlePromodoro("Short-Break")}
            className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-lg shadow-md transition duration-300"
          >
            Short Break
          </button>
          <button
            onClick={() => handlePromodoro("Long-Break")}
            className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-lg shadow-md transition duration-300"
          >
            Long Break
          </button>
        </div>

        <div className="text-center">
     
          {
            timerTime==="focus-session" && <Timer setTymerTime={setTymerTime}/>
          }  
          {
            timerTime ==="Short-Break" && <BreakTimerShort setTymerTime={setTymerTime}/>
          }
          {
            timerTime ==="Long-Break" && <BreakTimerLong setTymerTime={setTymerTime}/>
          }
      
        </div>
      </div>
    </>
  );
}
