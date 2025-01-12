"use client";
import axios from "axios";
import { useTimer } from "react-timer-hook";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useSelector } from "react-redux";

const Timer = ({ timeSpan,timerType }) => {
  const expiryTimestamp = new Date();
  const {user} = useSelector((state)=> state?.userData)
  const axiosPublic = useAxiosPublic()
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + timeSpan); // Timer span

  const sessionCompleted =async () =>{
    console.log("session completed")
    const data = {
      user_id:user?._id,
      duration: 25
    }
    if(timerType == "focus-session"){
      const response =await axiosPublic.post(
        "/api/focus-session",
        data,
        {
          headers: {
            user_id: user?._id
          },
        }
      );
    }
  }

  const {
    seconds,
    minutes,
    isRunning,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    autoStart: false,
    onExpire: () => sessionCompleted(),
  });

  const reset = () => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + timeSpan);
    restart(time);
    pause();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Fancy Timer</h1>
        <div className="flex justify-center items-center text-8xl font-mono space-x-2 bg-gray-700 p-6 rounded-lg shadow-lg">
          <span>{String(minutes).padStart(2, "0")}</span>
          <span className="text-gray-400">:</span>
          <span>{String(seconds).padStart(2, "0")}</span>
        </div>
        <p className="mt-4 text-lg">
          {isRunning ? (
            <span className="text-green-400">Running</span>
          ) : (
            <span className="text-red-400">Paused</span>
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
      </div>
    </div>
  );
};

export default Timer;

