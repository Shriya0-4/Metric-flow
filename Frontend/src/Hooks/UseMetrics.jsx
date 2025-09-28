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

  const fetchAllMetrics = async () => {
    const [sysData, diskData, statsData] = await Promise.all([
      ApiService.fetchSystemMetrics(),
      ApiService.fetchDiskSpace(),
      ApiService.fetchEndpointStats(),
    ]);

    if (sysData) setSystemMetrics((prev) => ({ ...prev, ...sysData }));
    if (diskData) setSystemMetrics((prev) => ({ ...prev, ...diskData }));
    if (statsData) setEndpointStats(statsData);
  };

  useEffect(() => {
    fetchAllMetrics().finally(() => setLoading(false));

    const intervals = [
      setInterval(
        () =>
          ApiService.fetchSystemMetrics().then((data) => {
            if (data) setSystemMetrics((prev) => ({ ...prev, ...data }));
          }),
        API_CONFIG.INTERVALS.METRICS
      ),

      setInterval(
        () =>
          ApiService.fetchDiskSpace().then((data) => {
            if (data) setSystemMetrics((prev) => ({ ...prev, ...data }));
          }),
        API_CONFIG.INTERVALS.DISK
      ),

      setInterval(
        () =>
          ApiService.fetchEndpointStats().then((data) => {
            if (data) setEndpointStats(data);
          }),
        API_CONFIG.INTERVALS.ENDPOINT_STATS
      ),
    ];

    return () => intervals.forEach(clearInterval);
  }, []);

  return { systemMetrics, endpointStats, loading };
};
