import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {styles} from './DronesScreen.styles';
import {fleetAPI} from '../../api/endpoints/fleet';
import {Drone, DroneStatus} from '../../types/drone.types';

type FilterType = 'all' | 'connected' | 'in_flight' | 'charging' | 'maintenance';

export const DronesScreen = () => {
  const [drones, setDrones] = useState<Drone[]>([]);
  const [filteredDrones, setFilteredDrones] = useState<Drone[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  useEffect(() => {
    loadDrones();
  }, []);

  useEffect(() => {
    filterDrones();
  }, [drones, searchQuery, activeFilter]);

  const loadDrones = async () => {
    try {
      setIsLoading(true);
      const data = await fleetAPI.getDrones();
      setDrones(data);
    } catch (error: any) {
      console.error('Error loading drones:', error);
      Alert.alert(
        'Error',
        error?.response?.data?.message || 'Failed to load drones. Please try again.'
      );
      // Use mock data for development
      setDrones(getMockDrones());
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await loadDrones();
    setIsRefreshing(false);
  };

  const filterDrones = () => {
    let filtered = [...drones];

    // Apply status filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(drone => drone.status === activeFilter);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        drone =>
          drone.name.toLowerCase().includes(query) ||
          drone.model.toLowerCase().includes(query) ||
          drone.serialNumber.toLowerCase().includes(query)
      );
    }

    setFilteredDrones(filtered);
  };

  const getStatusColor = (status: DroneStatus): string => {
    switch (status) {
      case 'connected':
        return '#10B981';
      case 'in_flight':
        return '#3B82F6';
      case 'charging':
        return '#F59E0B';
      case 'maintenance':
        return '#8B5CF6';
      case 'error':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getStatusIcon = (status: DroneStatus): string => {
    switch (status) {
      case 'connected':
        return 'check-circle';
      case 'in_flight':
        return 'flight';
      case 'charging':
        return 'battery-charging-full';
      case 'maintenance':
        return 'build';
      case 'error':
        return 'error';
      default:
        return 'radio-button-unchecked';
    }
  };

  const getStatusLabel = (status: DroneStatus): string => {
    return status
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handleDronePress = (drone: Drone) => {
    // TODO: Navigate to drone details
    Alert.alert(drone.name, `Serial: ${drone.serialNumber}\nStatus: ${getStatusLabel(drone.status)}`);
  };

  const handleAddDrone = () => {
    // TODO: Navigate to add drone screen
    Alert.alert('Add Drone', 'This feature will be available soon.');
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1e934d" />
          <Text style={styles.loadingText}>Loading fleet...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Fleet Management</Text>
          <Text style={styles.headerSubtitle}>
            {filteredDrones.length} drone{filteredDrones.length !== 1 ? 's' : ''} available
          </Text>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleAddDrone}>
          <Icon name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search drones..."
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Icon name="close" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        )}
      </View>

      {/* Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}>
        <FilterChip
          label="All"
          count={drones.length}
          active={activeFilter === 'all'}
          onPress={() => setActiveFilter('all')}
        />
        <FilterChip
          label="Connected"
          count={drones.filter(d => d.status === 'connected').length}
          active={activeFilter === 'connected'}
          onPress={() => setActiveFilter('connected')}
          color="#10B981"
        />
        <FilterChip
          label="In Flight"
          count={drones.filter(d => d.status === 'in_flight').length}
          active={activeFilter === 'in_flight'}
          onPress={() => setActiveFilter('in_flight')}
          color="#3B82F6"
        />
        <FilterChip
          label="Charging"
          count={drones.filter(d => d.status === 'charging').length}
          active={activeFilter === 'charging'}
          onPress={() => setActiveFilter('charging')}
          color="#F59E0B"
        />
        <FilterChip
          label="Maintenance"
          count={drones.filter(d => d.status === 'maintenance').length}
          active={activeFilter === 'maintenance'}
          onPress={() => setActiveFilter('maintenance')}
          color="#8B5CF6"
        />
      </ScrollView>

      {/* Drone List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} colors={['#1e934d']} />
        }>
        {filteredDrones.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Icon name="drone" size={64} color="#D1D5DB" />
            <Text style={styles.emptyTitle}>
              {searchQuery ? 'No drones found' : 'No drones available'}
            </Text>
            <Text style={styles.emptySubtitle}>
              {searchQuery
                ? 'Try adjusting your search or filters'
                : 'Add your first drone to get started'}
            </Text>
          </View>
        ) : (
          filteredDrones.map(drone => (
            <DroneCard
              key={drone.id}
              drone={drone}
              onPress={() => handleDronePress(drone)}
              statusColor={getStatusColor(drone.status)}
              statusIcon={getStatusIcon(drone.status)}
              statusLabel={getStatusLabel(drone.status)}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

// Filter Chip Component
interface FilterChipProps {
  label: string;
  count: number;
  active: boolean;
  onPress: () => void;
  color?: string;
}

const FilterChip: React.FC<FilterChipProps> = ({label, count, active, onPress, color}) => (
  <TouchableOpacity
    style={[
      styles.filterChip,
      active && styles.filterChipActive,
      active && color && {backgroundColor: color},
    ]}
    onPress={onPress}>
    <Text style={[styles.filterChipText, active && styles.filterChipTextActive]}>
      {label} ({count})
    </Text>
  </TouchableOpacity>
);

// Drone Card Component
interface DroneCardProps {
  drone: Drone;
  onPress: () => void;
  statusColor: string;
  statusIcon: string;
  statusLabel: string;
}

const DroneCard: React.FC<DroneCardProps> = ({
  drone,
  onPress,
  statusColor,
  statusIcon,
  statusLabel,
}) => (
  <TouchableOpacity style={styles.droneCard} onPress={onPress}>
    {/* Drone Image/Icon */}
    <View style={styles.droneImageContainer}>
      {drone.imageUrl ? (
        <View style={styles.droneImage}>
          <Icon name="drone" size={32} color="#1e934d" />
        </View>
      ) : (
        <View style={styles.droneImagePlaceholder}>
          <Icon name="drone" size={32} color="#1e934d" />
        </View>
      )}
    </View>

    {/* Drone Info */}
    <View style={styles.droneInfo}>
      <View style={styles.droneHeader}>
        <Text style={styles.droneName}>{drone.name}</Text>
        <View style={[styles.statusBadge, {backgroundColor: statusColor + '20'}]}>
          <Icon name={statusIcon} size={12} color={statusColor} />
          <Text style={[styles.statusText, {color: statusColor}]}>{statusLabel}</Text>
        </View>
      </View>
      
      <Text style={styles.droneModel}>{drone.model}</Text>
      <Text style={styles.droneSerial}>SN: {drone.serialNumber}</Text>

      {/* Stats */}
      <View style={styles.droneStats}>
        <View style={styles.statItem}>
          <Icon name="battery-std" size={16} color="#6B7280" />
          <Text style={styles.statText}>{drone.batteryLevel}%</Text>
        </View>
        <View style={styles.statItem}>
          <Icon name="flight" size={16} color="#6B7280" />
          <Text style={styles.statText}>{drone.totalFlightTime}h</Text>
        </View>
        <View style={styles.statItem}>
          <Icon name="route" size={16} color="#6B7280" />
          <Text style={styles.statText}>{drone.totalDistance}km</Text>
        </View>
      </View>
    </View>

    {/* Arrow */}
    <Icon name="chevron-right" size={24} color="#D1D5DB" />
  </TouchableOpacity>
);

// Mock data for development
const getMockDrones = (): Drone[] => [
  {
    id: '1',
    name: 'Drone AG-01',
    model: 'DJI Mavic 3 Pro',
    manufacturer: 'DJI',
    serialNumber: 'DJI-M3P-001',
    status: 'connected',
    batteryLevel: 85,
    flightMode: 'gps',
    totalFlightTime: 120,
    totalDistance: 450,
    lastFlightDate: '2026-01-20T10:30:00Z',
    createdAt: '2025-12-01T00:00:00Z',
    updatedAt: '2026-01-20T10:30:00Z',
  },
  {
    id: '2',
    name: 'Drone AG-02',
    model: 'DJI Air 3',
    manufacturer: 'DJI',
    serialNumber: 'DJI-AIR3-002',
    status: 'in_flight',
    batteryLevel: 65,
    flightMode: 'auto',
    totalFlightTime: 85,
    totalDistance: 280,
    lastFlightDate: '2026-01-21T08:15:00Z',
    createdAt: '2025-12-15T00:00:00Z',
    updatedAt: '2026-01-21T08:15:00Z',
  },
  {
    id: '3',
    name: 'Drone AG-03',
    model: 'Autel EVO Lite+',
    manufacturer: 'Autel',
    serialNumber: 'AUT-EVO-003',
    status: 'charging',
    batteryLevel: 45,
    flightMode: 'manual',
    totalFlightTime: 95,
    totalDistance: 320,
    lastFlightDate: '2026-01-20T16:00:00Z',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-20T16:00:00Z',
  },
  {
    id: '4',
    name: 'Drone AG-04',
    model: 'DJI Mini 4 Pro',
    manufacturer: 'DJI',
    serialNumber: 'DJI-M4P-004',
    status: 'maintenance',
    batteryLevel: 20,
    flightMode: 'gps',
    totalFlightTime: 150,
    totalDistance: 580,
    lastFlightDate: '2026-01-18T14:00:00Z',
    createdAt: '2025-11-20T00:00:00Z',
    updatedAt: '2026-01-18T14:00:00Z',
  },
  {
    id: '5',
    name: 'Drone AG-05',
    model: 'DJI Mavic 3 Classic',
    manufacturer: 'DJI',
    serialNumber: 'DJI-M3C-005',
    status: 'connected',
    batteryLevel: 100,
    flightMode: 'gps',
    totalFlightTime: 200,
    totalDistance: 720,
    lastFlightDate: '2026-01-20T12:00:00Z',
    createdAt: '2025-10-10T00:00:00Z',
    updatedAt: '2026-01-20T12:00:00Z',
  },
];