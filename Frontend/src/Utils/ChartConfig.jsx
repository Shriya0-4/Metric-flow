export const createLineChartData = (labels, data, label, color) => {
  // Clean and validate data
  const cleanData = data.map((value) => {
    const num = parseFloat(value);
    return isNaN(num) ? 0 : num;
  });

  // Debug logging
  console.log(`Chart data for ${label}:`, {
    labels: labels,
    data: cleanData,
    min: Math.min(...cleanData),
    max: Math.max(...cleanData),
    avg: cleanData.reduce((a, b) => a + b, 0) / cleanData.length,
  });

  return {
    labels: labels,
    datasets: [
      {
        label,
        data: cleanData,
        borderColor: color,
        backgroundColor: color,
        borderWidth: 3,
        fill: true,
        tension: 0.3,
        pointRadius: 2,
        pointHoverRadius: 6,
        pointBackgroundColor: color,
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointHoverBorderWidth: 3,
        spanGaps: false,
      },
    ],
  };
};

export const createDoughnutChartData = (usedValue, freeValue, colors) => ({
  labels: ["Used", "Free"],
  datasets: [
    {
      data: [parseFloat(usedValue), parseFloat(freeValue)],
      backgroundColor: colors,
      borderWidth: 0,
      hoverBorderWidth: 2,
      hoverBorderColor: "#ffffff",
    },
  ],
});

export const lineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    intersect: false,
    mode: "index",
  },
  plugins: {
    legend: {
      labels: {
        color: "#374151",
        font: {
          size: 12,
          weight: "500",
        },
        usePointStyle: true,
        padding: 20,
      },
    },
    tooltip: {
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      titleColor: "#374151",
      bodyColor: "#6b7280",
      borderColor: "#e5e7eb",
      borderWidth: 1,
      cornerRadius: 8,
      displayColors: false,
    },
  },
  scales: {
    x: {
      type: "category",
      ticks: {
        color: "#6b7280",
        font: { size: 11 },
        maxTicksLimit: 10,
      },
      grid: {
        color: "rgba(156, 163, 175, 0.2)",
        drawBorder: false,
      },
      border: {
        display: false,
      },
    },
    y: {
      type: "linear",
      beginAtZero: true,
      min: 0,
      ticks: {
        color: "#6b7280",
        font: { size: 11 },
        callback: function (value) {
          return value + "%";
        },
      },
      grid: {
        color: "rgba(156, 163, 175, 0.2)",
        drawBorder: false,
      },
      border: {
        display: false,
      },
    },
  },
  elements: {
    point: {
      hoverRadius: 6,
      radius: 3,
    },
    line: {
      borderWidth: 2,
      tension: 0.4,
    },
  },
};

export const doughnutChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        color: "#374151",
        font: {
          size: 12,
          weight: "500",
        },
        usePointStyle: true,
        padding: 20,
      },
    },
    tooltip: {
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      titleColor: "#374151",
      bodyColor: "#6b7280",
      borderColor: "#e5e7eb",
      borderWidth: 1,
      cornerRadius: 8,
      callbacks: {
        label: function (context) {
          const label = context.label || "";
          const value = (context.parsed / 1024).toFixed(1);
          return `${label}: ${value} GB`;
        },
      },
    },
  },
  cutout: "60%",
};

export const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      min: 0,
      max: 100,
      ticks: { color: "#6b7280" },
    },
    x: {
      ticks: { color: "#6b7280" },
    },
  },
};
