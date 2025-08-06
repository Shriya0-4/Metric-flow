import { useState, useEffect } from "react";
import ApiService from "../API/index";
import { API_CONFIG } from "../Constants/constant";

export const useMetrics = () => {
  const [systemMetrics, setSystemMetrics] = useState({
    cpuUsagePercent: 0,
    memory: { totalMb: 0, freeMb: 0, usedMb: 0, usedPercent: 0 },
    diskSpace: { totalMb: 0, freeMb: 0, usedMb: 0, usedPercent: 0 },
    platform: "",
    uptime: "0 seconds",
  });

  const [endpointStats, setEndpointStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSystemMetrics = async () => {
    try {
      const data = await ApiService.fetchSystemMetrics();
      setSystemMetrics((prev) => ({ ...prev, ...data }));
      setError(null);
    } catch (error) {
      setError("Failed to fetch system metrics", error);
    }
  };

  const fetchDiskSpace = async () => {
    try {
      const data = await ApiService.fetchDiskSpace();
      setSystemMetrics((prev) => ({ ...prev, ...data }));
    } catch {
      setError("Failed to fetch disk space");
    }
  };

  const fetchEndpointStats = async () => {
    try {
      const data = await ApiService.fetchEndpointStats();
      setEndpointStats(data);
    } catch (error) {
      setError("Failed to fetch endpoint stats", error);
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      await Promise.all([
        fetchSystemMetrics(),
        fetchDiskSpace(),
        fetchEndpointStats(),
      ]);
      setLoading(false);
    };

    fetchInitialData();

    const metricsInterval = setInterval(
      fetchSystemMetrics,
      API_CONFIG.INTERVALS.METRICS
    );
    const diskInterval = setInterval(fetchDiskSpace, API_CONFIG.INTERVALS.DISK);
    const endpointInterval = setInterval(
      fetchEndpointStats,
      API_CONFIG.INTERVALS.ENDPOINT_STATS
    );

    return () => {
      clearInterval(metricsInterval);
      clearInterval(diskInterval);
      clearInterval(endpointInterval);
    };
  }, []);

  return {
    systemMetrics,
    endpointStats,
    loading,
    error,
  };
};
