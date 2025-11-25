import {authAPI} from '../api/endpoints/auth';
import {LoginRequest, RegisterRequest, AuthResponse} from '../types/api.types';
import {saveToken, saveRefreshToken, saveUserData, removeToken, removeUserData} from './storageService';

/**
 * Authentication business logic service
 */

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await authAPI.login(credentials);

    // Save tokens and user data
    await saveToken(response.token);
    await saveRefreshToken(response.refreshToken);
    await saveUserData(response.user);

    return response;
  },

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await authAPI.register(userData);

    // Save tokens and user data
    await saveToken(response.token);
    await saveRefreshToken(response.refreshToken);
    await saveUserData(response.user);

    return response;
  },

  async logout(): Promise<void> {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      // Clear local data regardless of API call result
      await removeToken();
      await removeUserData();
    }
  },

  async forgotPassword(email: string): Promise<void> {
    await authAPI.forgotPassword(email);
  },

  async resetPassword(token: string, newPassword: string): Promise<void> {
    await authAPI.resetPassword(token, newPassword);
  },
};

export default authService;
