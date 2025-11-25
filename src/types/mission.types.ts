/**
 * Mission-related type definitions
 */

import {Timestamp, Location} from './common.types';

export interface Mission extends Timestamp {
  id: string;
  name: string;
  description?: string;
  droneId: string;
  status: MissionStatus;
  type: MissionType;
  industry?: IndustryType;
  scheduledDate?: string;
  startedAt?: string;
  completedAt?: string;
  route: Waypoint[];
  estimatedDuration: number; // minutes
  actualDuration?: number; // minutes
  estimatedDistance: number; // kilometers
  actualDistance?: number; // kilometers
  weather?: WeatherConditions;
  notes?: string;
}

export type MissionStatus =
  | 'draft'
  | 'scheduled'
  | 'in_progress'
  | 'paused'
  | 'completed'
  | 'cancelled'
  | 'failed';

export type MissionType =
  | 'inspection'
  | 'mapping'
  | 'surveillance'
  | 'delivery'
  | 'photography'
  | 'agriculture'
  | 'emergency'
  | 'custom';

export type IndustryType =
  | 'agriculture'
  | 'infrastructure'
  | 'construction'
  | 'emergency'
  | 'commercial';

export interface Waypoint extends Location {
  id: string;
  order: number;
  action?: WaypointAction;
  duration?: number; // seconds to hover
  capturePhoto?: boolean;
  captureVideo?: boolean;
}

export type WaypointAction =
  | 'hover'
  | 'capture'
  | 'rotate'
  | 'wait'
  | 'land'
  | 'takeoff';

export interface MissionPlan {
  name: string;
  description?: string;
  droneId: string;
  type: MissionType;
  industry?: IndustryType;
  scheduledDate?: string;
  route: Omit<Waypoint, 'id'>[];
}

export interface WeatherConditions {
  temperature: number; // Celsius
  windSpeed: number; // m/s
  windDirection: number; // degrees
  humidity: number; // percentage
  pressure: number; // hPa
  visibility: number; // meters
  conditions: string; // e.g., 'clear', 'cloudy', 'rain'
  isFlyable: boolean;
}

export interface MissionTemplate {
  id: string;
  name: string;
  description: string;
  type: MissionType;
  industry?: IndustryType;
  route: Omit<Waypoint, 'id'>[];
  estimatedDuration: number;
  thumbnail?: string;
}
