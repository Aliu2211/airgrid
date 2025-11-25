/**
 * Drone-related type definitions
 */

import {Timestamp, Location} from './common.types';

export interface Drone extends Timestamp {
  id: string;
  name: string;
  model: string;
  manufacturer: string;
  serialNumber: string;
  status: DroneStatus;
  batteryLevel: number;
  flightMode: FlightMode;
  location?: Location;
  totalFlightTime: number; // in minutes
  totalDistance: number; // in kilometers
  lastFlightDate?: string;
  imageUrl?: string;
}

export type DroneStatus =
  | 'connected'
  | 'disconnected'
  | 'in_flight'
  | 'charging'
  | 'maintenance'
  | 'error';

export type FlightMode = 'manual' | 'auto' | 'gps' | 'sport' | 'atti';

export interface DroneHealth {
  droneId: string;
  batteryHealth: number; // percentage
  motorHealth: number; // percentage
  gpsHealth: number; // percentage
  compassHealth: number; // percentage
  cameraHealth: number; // percentage
  overallHealth: number; // percentage
  lastCheckDate: string;
  issues: DroneIssue[];
}

export interface DroneIssue {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  component: string;
  description: string;
  detectedAt: string;
  resolved: boolean;
}

export interface DroneTelemetry {
  droneId: string;
  timestamp: string;
  location: Location;
  batteryLevel: number;
  speed: number; // m/s
  altitude: number; // meters
  heading: number; // degrees
  flightMode: FlightMode;
  signalStrength: number; // percentage
}
