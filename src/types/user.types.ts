/**
 * User-related type definitions
 */

import {Timestamp} from './common.types';

export interface User extends Timestamp {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  subscription: SubscriptionTier;
  industry?: string;
  organization?: string;
  certifications?: string[];
  preferences: UserPreferences;
}

export type UserRole = 'user' | 'pilot' | 'admin' | 'enterprise';

export type SubscriptionTier = 'free' | 'pro' | 'business' | 'enterprise';

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  units: 'metric' | 'imperial';
  notifications: NotificationPreferences;
  mapStyle: 'standard' | 'satellite' | 'hybrid';
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  sms: boolean;
  missionReminders: boolean;
  fleetAlerts: boolean;
  weatherAlerts: boolean;
  marketingEmails: boolean;
}

export interface UserProfile {
  user: User;
  stats: UserStats;
}

export interface UserStats {
  totalFlights: number;
  totalFlightTime: number; // minutes
  totalDistance: number; // kilometers
  dronesOwned: number;
  missionsCompleted: number;
  joinedDate: string;
}
