import {apiClient} from '../client';

/**
 * Weather data API endpoints
 */
export const weatherAPI = {
  getCurrentWeather: async (latitude: number, longitude: number) => {
    const response = await apiClient.get('/weather/current', {
      params: {latitude, longitude},
    });
    return response.data;
  },

  getForecast: async (latitude: number, longitude: number) => {
    const response = await apiClient.get('/weather/forecast', {
      params: {latitude, longitude},
    });
    return response.data;
  },
};
