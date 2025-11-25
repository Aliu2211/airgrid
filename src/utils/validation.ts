import {VALIDATION} from '../config/constants';

/**
 * Form validation utility functions
 */

export const validation = {
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  password: (password: string): {valid: boolean; message?: string} => {
    if (password.length < VALIDATION.MIN_PASSWORD_LENGTH) {
      return {
        valid: false,
        message: `Password must be at least ${VALIDATION.MIN_PASSWORD_LENGTH} characters`,
      };
    }
    if (password.length > VALIDATION.MAX_PASSWORD_LENGTH) {
      return {
        valid: false,
        message: `Password must be less than ${VALIDATION.MAX_PASSWORD_LENGTH} characters`,
      };
    }
    // Check for at least one uppercase, one lowercase, and one number
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (!hasUpperCase || !hasLowerCase || !hasNumber) {
      return {
        valid: false,
        message:
          'Password must contain at least one uppercase, one lowercase, and one number',
      };
    }

    return {valid: true};
  },

  phone: (phone: string): boolean => {
    // Basic phone validation - adjust regex based on your requirements
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phone.replace(/[\s-]/g, ''));
  },

  required: (value: any): boolean => {
    return value !== null && value !== undefined && value !== '';
  },

  altitude: (altitude: number): {valid: boolean; message?: string} => {
    if (altitude < VALIDATION.MIN_ALTITUDE) {
      return {
        valid: false,
        message: `Altitude must be at least ${VALIDATION.MIN_ALTITUDE} meters`,
      };
    }
    if (altitude > VALIDATION.MAX_ALTITUDE) {
      return {
        valid: false,
        message: `Altitude cannot exceed ${VALIDATION.MAX_ALTITUDE} feet`,
      };
    }
    return {valid: true};
  },
};

export default validation;
