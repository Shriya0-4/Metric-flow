export const API_CONFIG = {
  BASE_URL: "http://localhost:3001",
  ENDPOINTS: {
    SYSTEM_METRICS: "/api/system/metrics",
    DISK_SPACE: "/api/system/disk",
    ENDPOINT_STATS: "/api/dummy/stats",
    DUMMY_GET: "/api/dummy/dummy1",
    DUMMY_POST: "/api/dummy/dummy2",
  },
  INTERVALS: {
    METRICS: 3000,
    DISK: 10000,
    ENDPOINT_STATS: 5000,
  },
};

export const CHART_CONFIG = {
  MAX_DATA_POINTS: 20,
  COLORS: {
    CPU: "#3b82f6",
    MEMORY: "#10b981",
    DISK_USED: "#f59e0b",
    DISK_FREE: "#6366f1",
    MEMORY_USED: "#ef4444",
    MEMORY_FREE: "#22c55e",
  },
};

export const THEME = {
  colors: {
    primary: "#2563eb",
    secondary: "#10b981",
    accent: "#f59e0b",
    purple: "#8b5cf6",
    red: "#ef4444",
    green: "#22c55e",
    gray: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827",
    },
  },
};
