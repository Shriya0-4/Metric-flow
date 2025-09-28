import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import { useSocket } from "../Hooks/UseSocket";
import { useMetrics } from "../Hooks/useMetrics";
import MetricCard from "../Components/MetricCard";
import StatusBar from "../Components/StatusBar";
import ChartCard from "../Components/ChartCard";
import EndpointStats from "../Components/EndPointStatus";
import {
  createLineChartData,
  createDoughnutChartData,
  lineChartOptions,
  doughnutChartOptions,
} from "../Utils/ChartConfig";
import { CHART_CONFIG, API_CONFIG } from "../Constants/constant";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const MetricFlowDashboard = () => {
  const { connectionStatus, cpuHistory, memoryHistory, timeLabels } =
    useSocket();
  const { systemMetrics, endpointStats, loading, error } = useMetrics();

  useEffect(() => {
    let isMounted = true;

    const intervalId = setInterval(() => {
      if (!isMounted) return;

      fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.DUMMY_GET}`)
        .then((res) => res.text())
        .then(console.log)
        .catch((err) => console.warn("Dummy GET failed:", err));

      fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.DUMMY_POST}`, {
        method: "POST",
      })
        .then((res) => res.text())
        .then(console.log)
        .catch((err) => console.warn("Dummy POST failed:", err));
    }, 5000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  const safeTimeLabels = timeLabels.length ? timeLabels : ["00:00"];
  const safeCpuHistory = cpuHistory.length ? cpuHistory : [0];
  const safeMemoryHistory = memoryHistory.length ? memoryHistory : [0];

  const cpuChartData = createLineChartData(
    safeTimeLabels,
    safeCpuHistory,
    "CPU Usage (%)",
    CHART_CONFIG.COLORS.CPU
  );

  const memoryChartData = createLineChartData(
    safeTimeLabels,
    safeMemoryHistory,
    "Memory Usage (MB)",
    CHART_CONFIG.COLORS.MEMORY
  );

  const memoryDoughnutData = createDoughnutChartData(
    systemMetrics.memory.usedMb || 0,
    systemMetrics.memory.freeMb || 0,
    [CHART_CONFIG.COLORS.MEMORY_USED, CHART_CONFIG.COLORS.MEMORY_FREE]
  );

  const diskDoughnutData = createDoughnutChartData(
    systemMetrics.diskSpace.usedMb || 0,
    systemMetrics.diskSpace.freeMb || 0,
    [CHART_CONFIG.COLORS.DISK_USED, CHART_CONFIG.COLORS.DISK_FREE]
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading metrics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p className="text-lg font-medium">Error loading dashboard</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-light mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Metric Flow
          </h1>
          <p className="text-xl text-gray-600 font-light">
            Real-time System Monitoring Dashboard
          </p>
        </div>

        <StatusBar
          connectionStatus={connectionStatus}
          platform={systemMetrics.platform}
          uptime={systemMetrics.uptime}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="CPU Usage"
            value={`${systemMetrics.cpuUsagePercent || 0}%`}
            percentage={systemMetrics.cpuUsagePercent || 0}
            color="blue"
          />
          <MetricCard
            title="Memory Usage"
            value={`${systemMetrics.memory.usedPercent || 0}%`}
            percentage={systemMetrics.memory.usedPercent || 0}
            subtitle={`${((systemMetrics.memory.usedMb || 0) / 1024).toFixed(
              1
            )} GB / ${((systemMetrics.memory.totalMb || 0) / 1024).toFixed(
              1
            )} GB`}
            color="green"
          />
          <MetricCard
            title="Disk Usage"
            value={`${systemMetrics.diskSpace.usedPercent || 0}%`}
            percentage={systemMetrics.diskSpace.usedPercent || 0}
            subtitle={`${((systemMetrics.diskSpace.usedMb || 0) / 1024).toFixed(
              1
            )} GB / ${((systemMetrics.diskSpace.totalMb || 0) / 1024).toFixed(
              1
            )} GB`}
            color="yellow"
          />
          <EndpointStats endpointStats={endpointStats} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <ChartCard title="CPU Usage History" color="blue">
            <Line data={cpuChartData} options={lineChartOptions} />
          </ChartCard>
          <ChartCard title="Memory Usage History" color="green">
            <Line data={memoryChartData} options={lineChartOptions} />
          </ChartCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ChartCard title="Memory Distribution" color="red">
            <Doughnut
              data={memoryDoughnutData}
              options={doughnutChartOptions}
            />
          </ChartCard>
          <ChartCard title="Disk Distribution" color="indigo">
            <Doughnut data={diskDoughnutData} options={doughnutChartOptions} />
          </ChartCard>
        </div>
      </div>
    </div>
  );
};

export default MetricFlowDashboard;
