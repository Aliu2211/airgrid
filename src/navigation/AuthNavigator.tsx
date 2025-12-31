import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../types/navigation.types';
import {OnboardingScreen} from '../screens/auth/OnboardingScreen';
import {LoginScreen} from '../screens/auth/LoginScreen';
import {SignUpScreen} from '../screens/auth/SignUpScreen';

// Placeholder screens - will be replaced with actual screens
import {View, Text, StyleSheet} from 'react-native';

const Stack = createNativeStackNavigator<AuthStackParamList>();

// Temporary Forgot Password Screen
const ForgotPasswordScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Forgot Password Screen</Text>
    <Text style={styles.subtitle}>Coming Soon</Text>
  </View>
);

export const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={SignUpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
    color: '#111827',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
});
