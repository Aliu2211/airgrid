/**
 * Data formatting utility functions
 */

export const formatters = {
  /**
   * Format date to human-readable string
   */
  date: (date: string | Date, format: 'short' | 'long' = 'short'): string => {
    const d = new Date(date);
    if (format === 'short') {
      return d.toLocaleDateString();
    }
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  },

  /**
   * Format time to human-readable string
   */
  time: (date: string | Date): string => {
    const d = new Date(date);
    return d.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  },

  /**
   * Format duration in minutes to readable string
   */
  duration: (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours === 0) {
      return `${mins}m`;
    }
    if (mins === 0) {
      return `${hours}h`;
    }
    return `${hours}h ${mins}m`;
  },

  /**
   * Format distance in meters/kilometers
   */
  distance: (meters: number, unit: 'metric' | 'imperial' = 'metric'): string => {
    if (unit === 'imperial') {
      const feet = meters * 3.28084;
      if (feet < 5280) {
        return `${feet.toFixed(0)} ft`;
      }
      const miles = feet / 5280;
      return `${miles.toFixed(2)} mi`;
    }

    if (meters < 1000) {
      return `${meters.toFixed(0)} m`;
    }
    const km = meters / 1000;
    return `${km.toFixed(2)} km`;
  },

  /**
   * Format battery percentage
   */
  battery: (percentage: number): string => {
    return `${Math.round(percentage)}%`;
  },

  /**
   * Format speed
   */
  speed: (metersPerSecond: number, unit: 'metric' | 'imperial' = 'metric'): string => {
    if (unit === 'imperial') {
      const mph = metersPerSecond * 2.23694;
      return `${mph.toFixed(1)} mph`;
    }
    const kmh = metersPerSecond * 3.6;
    return `${kmh.toFixed(1)} km/h`;
  },

  /**
   * Format temperature
   */
  temperature: (celsius: number, unit: 'metric' | 'imperial' = 'metric'): string => {
    if (unit === 'imperial') {
      const fahrenheit = (celsius * 9) / 5 + 32;
      return `${fahrenheit.toFixed(1)}°F`;
    }
    return `${celsius.toFixed(1)}°C`;
  },

  /**
   * Format file size
   */
  fileSize: (bytes: number): string => {
    if (bytes < 1024) {
      return `${bytes} B`;
    }
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(2)} KB`;
    }
    if (bytes < 1024 * 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    }
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  },

  /**
   * Format currency
   */
  currency: (amount: number, currency: string = 'USD'): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(amount);
  },
};

export default formatters;
