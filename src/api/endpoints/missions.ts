import {apiClient} from '../client';
import {Mission, MissionPlan} from '../../types/mission.types';

/**
 * Mission planning and execution API endpoints
 */
export const missionsAPI = {
  getMissions: async (): Promise<Mission[]> => {
    const response = await apiClient.get('/missions');
    return response.data;
  },

  getMissionById: async (missionId: string): Promise<Mission> => {
    const response = await apiClient.get(`/missions/${missionId}`);
    return response.data;
  },

  createMission: async (mission: MissionPlan): Promise<Mission> => {
    const response = await apiClient.post('/missions', mission);
    return response.data;
  },

  updateMission: async (missionId: string, updates: Partial<Mission>): Promise<Mission> => {
    const response = await apiClient.put(`/missions/${missionId}`, updates);
    return response.data;
  },

  deleteMission: async (missionId: string): Promise<void> => {
    await apiClient.delete(`/missions/${missionId}`);
  },

  startMission: async (missionId: string): Promise<Mission> => {
    const response = await apiClient.post(`/missions/${missionId}/start`);
    return response.data;
  },

  pauseMission: async (missionId: string): Promise<Mission> => {
    const response = await apiClient.post(`/missions/${missionId}/pause`);
    return response.data;
  },

  completeMission: async (missionId: string): Promise<Mission> => {
    const response = await apiClient.post(`/missions/${missionId}/complete`);
    return response.data;
  },
};
