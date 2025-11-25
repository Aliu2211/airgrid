/**
 * Environment configuration
 * Update these values based on your environment
 */

export const IS_DEV = __DEV__;
export const IS_PROD = !__DEV__;

// API Configuration
export const API_BASE_URL = IS_DEV
  ? 'http://localhost:3000/api'
  : 'https://api.airgrid.com';

export const API_TIMEOUT = 30000; // 30 seconds

// Feature Flags
export const ENABLE_MARKETPLACE = false; // Phase 4 feature
export const ENABLE_AI_FEATURES = false; // Phase 2 feature
export const ENABLE_ANALYTICS = true;

// App Configuration
export const APP_NAME = 'AirGrid';
export const APP_VERSION = '1.0.0';

export default {
  IS_DEV,
  IS_PROD,
  API_BASE_URL,
  API_TIMEOUT,
  ENABLE_MARKETPLACE,
  ENABLE_AI_FEATURES,
  ENABLE_ANALYTICS,
  APP_NAME,
  APP_VERSION,
};
