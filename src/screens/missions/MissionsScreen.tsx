import React, {useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../config/theme';
import {styles} from './MissionsScreen.styles';

type MissionStatus = 'upcoming' | 'active' | 'completed';

interface Mission {
  id: string;
  name: string;
  status: MissionStatus;
  statusLabel: string;
  drone: string;
  pilot: string;
  date: string;
  time: string;
}

const tabs: {key: MissionStatus; label: string}[] = [
  {key: 'upcoming', label: 'Upcoming'},
  {key: 'active', label: 'Active'},
  {key: 'completed', label: 'Completed'},
];

const mockMissions: Mission[] = [
  {
    id: '1',
    name: 'Perimeter Scan - Site B',
    status: 'active',
    statusLabel: 'In Progress',
    drone: 'DJI Mavic 300',
    pilot: 'John Appleased',
    date: 'Nov 22, 14:30',
    time: '',
  },
  {
    id: '2',
    name: 'Corridor Mapping',
    status: 'active',
    statusLabel: 'In Progress',
    drone: 'Skydio X2',
    pilot: 'Maria Garcia',
    date: 'Nov 26, 09:00',
    time: '',
  },
  {
    id: '3',
    name: 'Facility Inspection',
    status: 'active',
    statusLabel: 'In Progress',
    drone: 'Parrot Anafi AI',
    pilot: 'Jane Doe',
    date: 'Nov 21, 16:00',
    time: '',
  },
  {
    id: '4',
    name: 'Field Survey - North',
    status: 'upcoming',
    statusLabel: 'Scheduled',
    drone: 'DJI Mavic 300',
    pilot: 'John Appleased',
    date: 'Nov 28, 10:00',
    time: '',
  },
  {
    id: '5',
    name: 'Warehouse Check',
    status: 'upcoming',
    statusLabel: 'Scheduled',
    drone: 'Skydio X2',
    pilot: 'Maria Garcia',
    date: 'Nov 29, 14:00',
    time: '',
  },
  {
    id: '6',
    name: 'Solar Panel Inspection',
    status: 'completed',
    statusLabel: 'Completed',
    drone: 'DJI Mavic 300',
    pilot: 'Jane Doe',
    date: 'Nov 18, 11:00',
    time: '',
  },
  {
    id: '7',
    name: 'Perimeter Scan - Site A',
    status: 'completed',
    statusLabel: 'Completed',
    drone: 'Parrot Anafi AI',
    pilot: 'John Appleased',
    date: 'Nov 15, 09:30',
    time: '',
  },
];

const getStatusColor = (status: MissionStatus) => {
  switch (status) {
    case 'active':
      return '#10B981';
    case 'upcoming':
      return '#3B82F6';
    case 'completed':
      return '#6B7280';
    default:
      return '#6B7280';
  }
};

const getStatusBgColor = (status: MissionStatus) => {
  switch (status) {
    case 'active':
      return '#ECFDF5';
    case 'upcoming':
      return '#EFF6FF';
    case 'completed':
      return '#F3F4F6';
    default:
      return '#F3F4F6';
  }
};

const MissionCard = ({mission}: {mission: Mission}) => {
  return (
    <View style={styles.missionCard}>
      <View style={styles.missionHeader}>
        <Text style={styles.missionName}>{mission.name}</Text>
        <View
          style={[
            styles.statusBadge,
            {backgroundColor: getStatusBgColor(mission.status)},
          ]}>
          <Text
            style={[
              styles.statusText,
              {color: getStatusColor(mission.status)},
            ]}>
            {mission.statusLabel}
          </Text>
        </View>
      </View>

      <View style={styles.missionDetails}>
        <View style={styles.detailRow}>
          <Icon name="flight" size={16} color={colors.gray[400]} />
          <Text style={styles.detailText}>{mission.drone}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="person" size={16} color={colors.gray[400]} />
          <Text style={styles.detailText}>{mission.pilot}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="schedule" size={16} color={colors.gray[400]} />
          <Text style={styles.detailText}>{mission.date}</Text>
        </View>
      </View>

      <View style={styles.missionActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="map" size={18} color={colors.gray[500]} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="edit" size={18} color={colors.gray[500]} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="content-copy" size={18} color={colors.gray[500]} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="delete-outline" size={18} color={colors.gray[500]} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const MissionsScreen = () => {
  const [activeTab, setActiveTab] = useState<MissionStatus>('active');

  const filteredMissions = mockMissions.filter(
    mission => mission.status === activeTab,
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Missions</Text>
        <TouchableOpacity style={styles.addButton}>
          <Icon name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.activeTab]}
            onPress={() => setActiveTab(tab.key)}>
            <Text
              style={[
                styles.tabText,
                activeTab === tab.key && styles.activeTabText,
              ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Mission List */}
      <FlatList
        data={filteredMissions}
        keyExtractor={item => item.id}
        renderItem={({item}) => <MissionCard mission={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="flight-takeoff" size={48} color={colors.gray[300]} />
            <Text style={styles.emptyText}>No {activeTab} missions</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};