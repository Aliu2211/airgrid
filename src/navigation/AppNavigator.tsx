import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {AuthNavigator} from './AuthNavigator';
import {MainNavigator} from './MainNavigator';
import {getToken} from '../services/storageService';
import {storageService} from '../services/storageService';
import {STORAGE_KEYS} from '../config/constants';
import {colors} from '../config/theme';

/**
 * Root app navigator that handles authentication and onboarding state
 * Shows AuthNavigator (with Onboarding) for first-time/unauthenticated users
 * Shows MainNavigator for authenticated users
 */
export const AppNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthentication();

    // Check auth status every second to detect login/logout
    const interval = setInterval(() => {
      checkAuthentication();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const checkAuthentication = async () => {
    try {
      const token = await getToken();
      setIsAuthenticated(!!token);
    } catch (error) {
      console.error('Auth check error:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  // Show AuthNavigator (includes Onboarding) for unauthenticated users
  // Show MainNavigator for authenticated users
  // For development: Toggle between the two by commenting/uncommenting

  // Production mode:
  // return isAuthenticated ? <MainNavigator /> : <AuthNavigator />;

  // Development mode - Show onboarding/auth flow (for testing)
  return <AuthNavigator />;

  // Development mode - Skip to main app (for testing)
  // return <MainNavigator />;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
});

export default AppNavigator;
