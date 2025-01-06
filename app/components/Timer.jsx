"use client"
import { useTimer } from 'react-timer-hook';
const Timer = ({timeSpan}) => {
    const expiryTimestamp = new Date();
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + timeSpan); // 10 minutes timer
    const {
      seconds,
      minutes,
      isRunning,
      pause,
      resume,
      restart,
    } = useTimer({ expiryTimestamp,autoStart:false, onExpire: () => console.warn('onExpire called') });
    const reset = () =>{
      const time = new Date();
      time.setSeconds(time.getSeconds() + timeSpan);
      
      restart(time)
      pause()
  
    }
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "100px" }}>
        <span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <p>{isRunning ? "Running" : "Not running"}</p>
      <button onClick={resume}>Start</button>
      <button onClick={pause}>Pause</button>

      <button onClick={reset}>Restart</button>
    </div>
  );
};

export default Timer;
