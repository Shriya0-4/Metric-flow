export const createLineChartData = (labels, data, label, color) => ({
  labels,
  datasets: [
    {
      label,
      data,
      borderColor: color,
      backgroundColor: `${color}20`,
      borderWidth: 2,
      fill: true,
      tension: 0.4,
      pointRadius: 3,
      pointHoverRadius: 5,
      pointBackgroundColor: color,
      pointBorderColor: "#ffffff",
      pointBorderWidth: 2,
    },
  ],
});

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
      ticks: {
        color: "#6b7280",
        font: { size: 11 },
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
      ticks: {
        color: "#6b7280",
        font: { size: 11 },
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
      grid: {
        color: "rgba(0,0,0,0.1)",
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
};
