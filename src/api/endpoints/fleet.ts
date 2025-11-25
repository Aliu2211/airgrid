import {apiClient} from '../client';
import {Drone, DroneHealth} from '../../types/drone.types';

/**
 * Fleet management API endpoints
 */
export const fleetAPI = {
  getDrones: async (): Promise<Drone[]> => {
    const response = await apiClient.get('/fleet/drones');
    return response.data;
  },

  getDroneById: async (droneId: string): Promise<Drone> => {
    const response = await apiClient.get(`/fleet/drones/${droneId}`);
    return response.data;
  },

  addDrone: async (drone: Partial<Drone>): Promise<Drone> => {
    const response = await apiClient.post('/fleet/drones', drone);
    return response.data;
  },

  updateDrone: async (droneId: string, updates: Partial<Drone>): Promise<Drone> => {
    const response = await apiClient.put(`/fleet/drones/${droneId}`, updates);
    return response.data;
  },

  deleteDrone: async (droneId: string): Promise<void> => {
    await apiClient.delete(`/fleet/drones/${droneId}`);
  },

  getDroneHealth: async (droneId: string): Promise<DroneHealth> => {
    const response = await apiClient.get(`/fleet/drones/${droneId}/health`);
    return response.data;
  },
};
