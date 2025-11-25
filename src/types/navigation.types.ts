/**
 * Navigation type definitions for React Navigation
 */

import type {NavigatorScreenParams} from '@react-navigation/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

// Root Stack Navigator
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
};

// Auth Stack Navigator
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  Onboarding: undefined;
};

// Main Tab Navigator
export type MainTabParamList = {
  Home: undefined;
  Scan: undefined;
  Map: undefined;
  Alert: undefined;
  Profile: undefined;
};

// Fleet Stack Navigator
export type FleetStackParamList = {
  FleetList: undefined;
  DroneDetails: {droneId: string};
  AddDrone: undefined;
  DroneHealth: {droneId: string};
};

// Mission Stack Navigator
export type MissionStackParamList = {
  MissionList: undefined;
  MissionPlanner: undefined;
  MissionDetails: {missionId: string};
  MissionExecute: {missionId: string};
  MissionHistory: undefined;
};

// Screen Props Types
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, T>;

export type MainTabScreenProps<T extends keyof MainTabParamList> =
  NativeStackScreenProps<MainTabParamList, T>;

// Declare global navigation types
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
