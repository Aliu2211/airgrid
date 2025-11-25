import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../types/navigation.types';

// Placeholder screens - will be replaced with actual screens
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Stack = createNativeStackNavigator<AuthStackParamList>();

// Temporary Login Screen
const LoginScreen = ({navigation}: any) => (
  <View style={styles.container}>
    <Text style={styles.title}>Login Screen</Text>
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('Register')}>
      <Text style={styles.buttonText}>Go to Register</Text>
    </TouchableOpacity>
  </View>
);

// Temporary Register Screen
const RegisterScreen = ({navigation}: any) => (
  <View style={styles.container}>
    <Text style={styles.title}>Register Screen</Text>
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('Login')}>
      <Text style={styles.buttonText}>Back to Login</Text>
    </TouchableOpacity>
  </View>
);

// Temporary Forgot Password Screen
const ForgotPasswordScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Forgot Password Screen</Text>
  </View>
);

// Temporary Onboarding Screen
const OnboardingScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Onboarding Screen</Text>
  </View>
);

export const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
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
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0A2463',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
