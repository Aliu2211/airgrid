import React from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../config/theme';
import {styles} from './HomeScreen.styles';

// Mock data - replace with actual data from API/state
const mockUser = {
  name: 'Alex Hartman',
  avatar: null,
};

const mockWeather = {
  temperature: 18,
  condition: 'Partly Cloudy',
  windSpeed: 12,
  humidity: 70,
};

const mockQuickActions = [
  {id: 1, icon: 'add-location-alt', label: 'Plan Mission', color: '#1e934d'},
  {id: 2, icon: 'qr-code-scanner', label: 'Scan', color: '#F59E0B'},
  {id: 3, icon: 'videocam', label: 'View Feed', color: '#EF4444'},
];

const mockActiveOperations = [
  {
    id: 1,
    name: 'Survey Alpha',
    droneId: 'Drone AG-01',
    status: 'active',
    duration: '57m 12 min',
  },
  {
    id: 2,
    name: 'Perimeter Scan',
    droneId: 'Drone AG-13',
    status: 'active',
    duration: '51h 38',
  },
];

const mockFleetHealth = {
  dronesOnline: 18,
  totalDrones: 20,
  flightHours: 1482,
};

const mockRecentActivity = [
  {
    id: 1,
    type: 'completed',
    title: 'Mission Completed',
    subtitle: 'Inspection Gamma - 5 min ago',
    icon: 'check-circle',
    color: '#10B981',
  },
  {
    id: 2,
    type: 'maintenance',
    title: 'Maintenance Logged',
    subtitle: 'Drone AG-04 - 1 hour ago',
    icon: 'build',
    color: '#3B82F6',
  },
  {
    id: 3,
    type: 'warning',
    title: 'Low Battery Warning',
    subtitle: 'Drone AG-11 - 3 hours ago',
    icon: 'battery-alert',
    color: '#F59E0B',
  },
];

const mockRecommendations = [
  {
    id: 1,
    title: 'Rotor Maintenance Due',
    subtitle: 'Drone AG-02 requires immediate attention.',
    icon: 'warning',
    color: '#F59E0B',
  },
  {
    id: 2,
    title: 'Firmware Update Available',
    subtitle: '5 drones have pending updates.',
    icon: 'system-update',
    color: '#10B981',
  },
];

export const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <View style={styles.avatarContainer}>
              {mockUser.avatar ? (
                <Image source={{uri: mockUser.avatar}} style={styles.avatar} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Text style={styles.avatarText}>
                    {mockUser.name.charAt(0)}
                  </Text>
                </View>
              )}
            </View>
            <Text style={styles.userName}>{mockUser.name}</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Icon name="notifications-none" size={24} color={colors.gray[700]} />
          </TouchableOpacity>
        </View>

        {/* Weather Widget */}
        <View style={styles.weatherWidget}>
          <View style={styles.weatherMain}>
            <Icon name="wb-cloudy" size={24} color="#64B5F6" />
            <Text style={styles.temperature}>{mockWeather.temperature}°C</Text>
          </View>
          <View style={styles.weatherDetails}>
            <View style={styles.weatherDetail}>
              <Icon name="air" size={14} color={colors.gray[500]} />
              <Text style={styles.weatherDetailText}>
                {mockWeather.windSpeed} km/h
              </Text>
            </View>
            <View style={styles.weatherDetail}>
              <Icon name="water-drop" size={14} color={colors.gray[500]} />
              <Text style={styles.weatherDetailText}>
                {mockWeather.humidity}%
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsContainer}>
            {mockQuickActions.map(action => (
              <TouchableOpacity key={action.id} style={styles.quickAction}>
                <View
                  style={[
                    styles.quickActionIcon,
                    {backgroundColor: action.color},
                  ]}>
                  <Icon name={action.icon} size={24} color="#FFFFFF" />
                </View>
                <Text style={styles.quickActionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Active Operations */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Active Operations</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.operationsContainer}>
            {mockActiveOperations.map(operation => (
              <View key={operation.id} style={styles.operationCard}>
                <View style={styles.operationStatus}>
                  <View style={styles.statusDot} />
                </View>
                <View style={styles.operationInfo}>
                  <Text style={styles.operationName}>{operation.name}</Text>
                  <Text style={styles.operationDrone}>{operation.droneId}</Text>
                </View>
                <Text style={styles.operationDuration}>{operation.duration}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Fleet Health Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fleet Health Summary</Text>
          <View style={styles.fleetHealthContainer}>
            <View style={styles.healthCard}>
              <View style={styles.healthIconContainer}>
                <Icon name="flight" size={20} color="#1e934d" />
              </View>
              <Text style={styles.healthValue}>
                {mockFleetHealth.dronesOnline}/{mockFleetHealth.totalDrones}
              </Text>
              <Text style={styles.healthLabel}>Drones Online</Text>
            </View>
            <View style={styles.healthCard}>
              <View style={styles.healthIconContainer}>
                <Icon name="schedule" size={20} color="#3B82F6" />
              </View>
              <Text style={styles.healthValue}>
                {mockFleetHealth.flightHours.toLocaleString()}
              </Text>
              <Text style={styles.healthLabel}>Flight Hours</Text>
            </View>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.activityContainer}>
            {mockRecentActivity.map(activity => (
              <View key={activity.id} style={styles.activityItem}>
                <View
                  style={[
                    styles.activityIconContainer,
                    {backgroundColor: `${activity.color}15`},
                  ]}>
                  <Icon name={activity.icon} size={18} color={activity.color} />
                </View>
                <View style={styles.activityInfo}>
                  <Text style={styles.activityTitle}>{activity.title}</Text>
                  <Text style={styles.activitySubtitle}>{activity.subtitle}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Recommendations */}
        <View style={[styles.section, styles.lastSection]}>
          <Text style={styles.sectionTitle}>Recommendations</Text>
          <View style={styles.recommendationsContainer}>
            {mockRecommendations.map(recommendation => (
              <View key={recommendation.id} style={styles.recommendationCard}>
                <View
                  style={[
                    styles.recommendationIconContainer,
                    {backgroundColor: `${recommendation.color}15`},
                  ]}>
                  <Icon
                    name={recommendation.icon}
                    size={20}
                    color={recommendation.color}
                  />
                </View>
                <View style={styles.recommendationInfo}>
                  <Text style={styles.recommendationTitle}>
                    {recommendation.title}
                  </Text>
                  <Text style={styles.recommendationSubtitle}>
                    {recommendation.subtitle}
                  </Text>
                </View>
                <Icon name="chevron-right" size={20} color={colors.gray[400]} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};