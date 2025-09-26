import React, { useState, useEffect, useRef } from "react";

export default function Stopwatch() {
  const [time, setTime] = useState(0);       // elapsed time in seconds
  const [isRunning, setIsRunning] = useState(false); // is stopwatch running
  const [isPaused, setIsPaused] = useState(false);   // is paused

  const intervalRef = useRef(null); // store interval ID

  // Start stopwatch
  const handleStart = () => {
    setTime(0);
    setIsRunning(true);
    setIsPaused(false);
  };

  // Stop stopwatch
  const handleStop = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTime(0);
    clearInterval(intervalRef.current);
  };

  // Pause stopwatch
  const handlePause = () => {
    setIsPaused(true);
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  // Resume stopwatch
  const handleResume = () => {
    setIsPaused(false);
    setIsRunning(true);
  };

  // Update time every second when running
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4">Stopwatch</h1>
      <h2 className="mb-4">{time} seconds</h2>
      <div className="d-flex justify-content-center gap-2">
        <button onClick={handleStart} className="btn btn-success">Start</button>
        <button onClick={handlePause} className="btn btn-warning">Pause</button>
        <button onClick={handleResume} className="btn btn-info">Resume</button>
        <button onClick={handleStop} className="btn btn-danger">Stop</button>
      </div>
    </div>
  );
}
