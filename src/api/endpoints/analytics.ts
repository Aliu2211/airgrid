import {apiClient} from '../client';

/**
 * Analytics and reporting API endpoints
 */
export const analyticsAPI = {
  getFleetStats: async () => {
    const response = await apiClient.get('/analytics/fleet-stats');
    return response.data;
  },

  getMissionStats: async (startDate?: string, endDate?: string) => {
    const response = await apiClient.get('/analytics/mission-stats', {
      params: {startDate, endDate},
    });
    return response.data;
  },

  getFlightLogs: async (droneId: string) => {
    const response = await apiClient.get(`/analytics/flight-logs/${droneId}`);
    return response.data;
  },
};
