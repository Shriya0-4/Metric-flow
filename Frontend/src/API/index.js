import { API_CONFIG } from "../Constants/constant";

class ApiService {
  async fetchSystemMetrics() {
    try {
      const response = await fetch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SYSTEM_METRICS}`
      );
      if (!response.ok) throw new Error("Failed to fetch system metrics");
      return await response.json();
    } catch (error) {
      console.warn("Error fetching system metrics:", error);
      return null;
    }
  }

  async fetchDiskSpace() {
    try {
      const response = await fetch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.DISK_SPACE}`
      );
      if (!response.ok) throw new Error("Failed to fetch disk space");
      return await response.json();
    } catch (error) {
      console.warn("Error fetching disk space:", error);
      return null;
    }
  }

  async fetchEndpointStats() {
    try {
      const response = await fetch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ENDPOINT_STATS}`
      );
      if (!response.ok) throw new Error("Failed to fetch endpoint stats");
      const data = await response.json();
      return data.endpointStats || {};
    } catch (error) {
      console.warn("Error fetching endpoint stats:", error);
      return {};
    }
  }
}

export default new ApiService();
