import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORAGE_KEYS} from '../config/constants';

/**
 * Local storage service using AsyncStorage
 */

export const storageService = {
  // Generic methods
  async setItem(key: string, value: any): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error('Error saving to storage:', error);
      throw error;
    }
  },

  async getItem<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error reading from storage:', error);
      return null;
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from storage:', error);
      throw error;
    }
  },

  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  },
};

// Auth-specific methods
export const saveToken = (token: string) =>
  storageService.setItem(STORAGE_KEYS.AUTH_TOKEN, token);

export const getToken = () =>
  storageService.getItem<string>(STORAGE_KEYS.AUTH_TOKEN);

export const removeToken = () =>
  storageService.removeItem(STORAGE_KEYS.AUTH_TOKEN);

export const saveRefreshToken = (token: string) =>
  storageService.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);

export const getRefreshToken = () =>
  storageService.getItem<string>(STORAGE_KEYS.REFRESH_TOKEN);

// User data methods
export const saveUserData = (userData: any) =>
  storageService.setItem(STORAGE_KEYS.USER_DATA, userData);

export const getUserData = () =>
  storageService.getItem(STORAGE_KEYS.USER_DATA);

export const removeUserData = () =>
  storageService.removeItem(STORAGE_KEYS.USER_DATA);

export default storageService;
