import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { API_CONFIG, CHART_CONFIG } from '../Constants/constant';

export const useSocket = () => {
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [cpuHistory, setCpuHistory] = useState([]);
  const [memoryHistory, setMemoryHistory] = useState([]);
  const [timeLabels, setTimeLabels] = useState([]);
  
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(API_CONFIG.BASE_URL);
    
    socketRef.current.on('connect', () => {
      setConnectionStatus('connected');
    });

    socketRef.current.on('disconnect', () => {
      setConnectionStatus('disconnected');
    });

    socketRef.current.on('systemMetrics', (data) => {
      const now = new Date().toLocaleTimeString();
      
      setCpuHistory(prev => {
        const newHistory = [...prev, parseFloat(data.cpuUsage)];
        return newHistory.slice(-CHART_CONFIG.MAX_DATA_POINTS);
      });
      
      setMemoryHistory(prev => {
        const newHistory = [...prev, data.memoryUsed];
        return newHistory.slice(-CHART_CONFIG.MAX_DATA_POINTS);
      });
      
      setTimeLabels(prev => {
        const newLabels = [...prev, now];
        return newLabels.slice(-CHART_CONFIG.MAX_DATA_POINTS);
      });
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  return {
    connectionStatus,
    cpuHistory,
    memoryHistory,
    timeLabels
  };
};