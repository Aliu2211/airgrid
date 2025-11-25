/**
 * App-wide constants
 */

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: '@airgrid_auth_token',
  REFRESH_TOKEN: '@airgrid_refresh_token',
  USER_DATA: '@airgrid_user_data',
  THEME_PREFERENCE: '@airgrid_theme',
  ONBOARDING_COMPLETE: '@airgrid_onboarding',
};

// Drone Status
export const DRONE_STATUS = {
  CONNECTED: 'connected',
  DISCONNECTED: 'disconnected',
  IN_FLIGHT: 'in_flight',
  CHARGING: 'charging',
  MAINTENANCE: 'maintenance',
  ERROR: 'error',
} as const;

// Mission Status
export const MISSION_STATUS = {
  DRAFT: 'draft',
  SCHEDULED: 'scheduled',
  IN_PROGRESS: 'in_progress',
  PAUSED: 'paused',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  FAILED: 'failed',
} as const;

// Flight Modes
export const FLIGHT_MODES = {
  MANUAL: 'manual',
  AUTO: 'auto',
  GPS: 'gps',
  SPORT: 'sport',
  ATTI: 'atti',
} as const;

// Industry Types
export const INDUSTRY_TYPES = {
  AGRICULTURE: 'agriculture',
  INFRASTRUCTURE: 'infrastructure',
  CONSTRUCTION: 'construction',
  EMERGENCY: 'emergency',
  COMMERCIAL: 'commercial',
} as const;

// Subscription Tiers
export const SUBSCRIPTION_TIERS = {
  FREE: 'free',
  PRO: 'pro',
  BUSINESS: 'business',
  ENTERPRISE: 'enterprise',
} as const;

// Map Defaults
export const MAP_DEFAULTS = {
  LATITUDE: 37.7749, // San Francisco
  LONGITUDE: -122.4194,
  ZOOM: 15,
  ALTITUDE: 120, // meters
};

// Validation Rules
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 128,
  MAX_DRONE_NAME_LENGTH: 50,
  MAX_MISSION_NAME_LENGTH: 100,
  MIN_ALTITUDE: 0,
  MAX_ALTITUDE: 400, // FAA limit (feet)
  MAX_FLIGHT_DISTANCE: 5000, // meters
};

export default {
  STORAGE_KEYS,
  DRONE_STATUS,
  MISSION_STATUS,
  FLIGHT_MODES,
  INDUSTRY_TYPES,
  SUBSCRIPTION_TIERS,
  MAP_DEFAULTS,
  VALIDATION,
};
