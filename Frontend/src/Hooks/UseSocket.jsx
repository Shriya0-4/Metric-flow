import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { API_CONFIG, CHART_CONFIG } from "../Constants/constant";

export const useSocket = () => {
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const [cpuHistory, setCpuHistory] = useState([]);
  const [memoryHistory, setMemoryHistory] = useState([]);
  const [timeLabels, setTimeLabels] = useState([]);

  const socketRef = useRef(null);

  useEffect(() => {
    console.log("Connecting to WebSocket ", API_CONFIG.BASE_URL);
    socketRef.current = io(API_CONFIG.BASE_URL);

    socketRef.current.on("connect", () => {
      console.log("WebSocket connected");
      setConnectionStatus("connected");
    });

    socketRef.current.on("disconnect", () => {
      console.log("WebSocket disconnected");
      setConnectionStatus("disconnected");
    });

    socketRef.current.on("systemMetrics", (data) => {
      console.log("WebSocket data received:", data);

      const now = new Date().toLocaleTimeString();
      const cpuValue = data.cpuUsage || data.cpuUsagePercent || 0;
      const memoryValue = data.memoryUsed || data.memory?.usedPercent || 0;

      setCpuHistory((prev) => {
        const newHistory = [...prev, parseFloat(cpuValue)];
        const trimmed = newHistory.slice(-CHART_CONFIG.MAX_DATA_POINTS);
        console.log("Updated CPU history:", trimmed);
        return trimmed;
      });

      setMemoryHistory((prev) => {
        const newHistory = [...prev, parseFloat(memoryValue)];
        const trimmed = newHistory.slice(-CHART_CONFIG.MAX_DATA_POINTS);
        console.log("Updated Memory history:", trimmed);
        return trimmed;
      });

      setTimeLabels((prev) => {
        const newLabels = [...prev, now];
        return newLabels.slice(-CHART_CONFIG.MAX_DATA_POINTS);
      });
    });

    socketRef.current.onAny((event, ...args) => {
      console.log("WebSocket event received:", event, args);
    });

    return () => {
      if (socketRef.current) {
        console.log("Disconnecting WebSocket");
        socketRef.current.disconnect();
      }
    };
  }, []);

  return {
    connectionStatus,
    cpuHistory,
    memoryHistory,
    timeLabels,
  };
};
