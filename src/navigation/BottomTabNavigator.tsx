/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, StyleSheet, Platform} from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {HomeScreen} from '../screens/home';
import {DronesScreen} from '../screens/drones';
import {MissionsScreen} from '../screens/missions';
import {AlertsScreen} from '../screens/alerts';
import {ProfileScreen} from '../screens/profile';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({focused}) => {
          let iconName: string;
          let isCenter = route.name === 'Missions';

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Drones':
              iconName = 'view-in-ar';
              break;
            case 'Missions':
              iconName = 'explore';
              break;
            case 'Alert':
              iconName = 'warning';
              break;
            case 'Profile':
              iconName = 'person';
              break;
            default:
              iconName = 'circle';
          }

          if (isCenter) {
            return (
              <View style={styles.centerButton}>
                <Icon name={iconName} size={45} color="#FFFFFF" />
              </View>
            );
          }

          return (
            <View style={styles.iconContainer}>
              {focused && <View style={styles.activeDot} />}
              <Icon
                name={iconName}
                size={25}
                color={focused ? '#4A9B7F' : '#B0B0B0'}
              />
            </View>
          );
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Drones" component={DronesScreen} />
      <Tab.Screen name="Missions" component={MissionsScreen} />
      <Tab.Screen name="Alert" component={AlertsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    height: 65,
    paddingBottom: 0,
    paddingTop: 0,
    paddingHorizontal: 16,
    borderTopWidth: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    ...Platform.select({
      android: {
        elevation: 4,
      },
    }),
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    position: 'relative',
  },
  activeDot: {
    position: 'absolute',
    top: 8,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#4A9B7F',
  },
  centerButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1e934dff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
    shadowColor: '#1e934dff',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
});
