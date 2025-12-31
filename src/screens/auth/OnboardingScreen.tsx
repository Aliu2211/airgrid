import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

const {width, height} = Dimensions.get('window');

interface OnboardingSlide {
  id: string;
  title: string;
  subtitle: string;
  description?: string;
  image?: any;
  type: 'welcome' | 'features' | 'permissions' | 'final';
  features?: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  permissions?: Array<{
    icon: string;
    title: string;
    description: string;
    action: string;
  }>;
}

const onboardingData: OnboardingSlide[] = [
  {
    id: '1',
    type: 'welcome',
    title: 'Welcome to AirGrid',
    subtitle: 'Precision in Every Flight',
    description:
      'Your unified platform for professional drone operations. Manage fleets, plan missions, and unlock aerial intelligence—all in one place.',
  },
  {
    id: '2',
    type: 'features',
    title: 'What AirGrid Can Do',
    subtitle: 'Powerful Tools for Professional Pilots',
    features: [
      {
        icon: 'precision-manufacturing',
        title: 'Intelligent Mission Planning',
        description:
          'AI-powered route optimization with weather-aware intelligent routing and terrain adjustments.',
      },
      {
        icon: 'cloud-off',
        title: 'Works Offline',
        description:
          'Access your key registration data and maps even with no internet connection.',
      },
      {
        icon: 'analytics',
        title: 'Real-Time Analytics',
        description:
          'Keep track of flight hours, drone health, and compliance reporting automatically.',
      },
    ],
  },
  {
    id: '3',
    type: 'features',
    title: 'Industry Solutions',
    subtitle: 'Tailored for Your Needs',
    features: [
      {
        icon: 'agriculture',
        title: 'Agriculture & Precision Farming',
        description:
          'NDVI analysis, crop health monitoring, and prescription mapping for optimal yields.',
      },
      {
        icon: 'construction',
        title: 'Infrastructure Inspection',
        description:
          'Automated defect detection, thermal imaging, and compliance checklists.',
      },
      {
        icon: 'emergency',
        title: 'Emergency Services',
        description:
          'Search patterns, thermal detection, and live situation sharing for rapid response.',
      },
    ],
  },
  {
    id: '4',
    type: 'permissions',
    title: 'Enable Key Features',
    subtitle: '',
    description:
      'AirGrid needs access to a few things to provide the best experience for managing your drone operations.',
    permissions: [
      {
        icon: 'location-on',
        title: 'Location Access',
        description:
          'To map flight zones, geotag data, and comply with local aviation regulations.',
        action: 'Allow',
      },
      {
        icon: 'camera-alt',
        title: 'Camera Access',
        description:
          'To scan drone QR codes for quick registration and capture field imagery.',
        action: 'Allow',
      },
      {
        icon: 'notifications',
        title: 'Push Notifications',
        description:
          'To receive alerts about flight status, weather, and regulation updates.',
        action: 'Enable',
      },
    ],
  },
  {
    id: '5',
    type: 'final',
    title: "You're Ready to Fly!",
    subtitle: '',
    description:
      'Welcome to AirGrid. Start managing your drone operations, streamline registration, and unlock new efficiencies for your missions.',
  },
];

export const OnboardingScreen = ({navigation}: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const viewableItemsChanged = useRef(({viewableItems}: any) => {
    if (viewableItems[0]) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  const scrollTo = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({index: currentIndex + 1});
    } else {
      // Navigate to main app
      navigation.replace('Login');
    }
  };

  const skip = () => {
    navigation.replace('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={({item}) => <OnboardingSlideComponent item={item} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        keyExtractor={item => item.id}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        scrollEventThrottle={32}
      />

      {/* Pagination Dots */}
      <View style={styles.paginationContainer}>
        {onboardingData.map((_, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 20, 8],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                {
                  width: dotWidth,
                  opacity,
                  backgroundColor:
                    index === currentIndex ? '#1e934d' : '#D1D5DB',
                },
              ]}
            />
          );
        })}
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={scrollTo}
          style={[
            styles.button,
            currentIndex === onboardingData.length - 1 &&
              styles.buttonLastSlide,
          ]}>
          <Text style={styles.buttonText}>
            {currentIndex === onboardingData.length - 1
              ? 'Start Flying'
              : currentIndex === 3
              ? 'Continue'
              : currentIndex === 0
              ? 'Get Started'
              : 'Next'}
          </Text>
        </TouchableOpacity>

        {currentIndex < onboardingData.length - 1 && (
          <TouchableOpacity onPress={skip} style={styles.skipButton}>
            <Text style={styles.skipText}>
              {currentIndex === 3 ? 'Skip for Now' : 'Skip'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const OnboardingSlideComponent = ({item}: {item: OnboardingSlide}) => {
  if (item.type === 'welcome' || item.type === 'final') {
    return (
      <View style={styles.slide}>
        <View style={styles.imageContainer}>
          <View style={styles.heroImagePlaceholder}>
            <Icon
              name={item.type === 'welcome' ? 'flight-takeoff' : 'check-circle'}
              size={120}
              color="#1e934d"
            />
          </View>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.title}>{item.title}</Text>
          {item.subtitle && (
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          )}
          {item.description && (
            <Text style={styles.description}>{item.description}</Text>
          )}
        </View>
      </View>
    );
  }

  if (item.type === 'features') {
    return (
      <View style={styles.slide}>
        <View style={styles.featuresHeader}>
          <Text style={styles.title}>{item.title}</Text>
          {item.subtitle && (
            <Text style={styles.featuresSubtitle}>{item.subtitle}</Text>
          )}
        </View>

        <View style={styles.featuresContainer}>
          {item.features?.map((feature, index) => (
            <View key={index} style={styles.featureCard}>
              <View style={styles.featureIconContainer}>
                <Icon name={feature.icon} size={28} color="#1e934d" />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>
                  {feature.description}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  }

  if (item.type === 'permissions') {
    return (
      <View style={styles.slide}>
        <View style={styles.permissionsHeader}>
          <Text style={styles.title}>{item.title}</Text>
          {item.description && (
            <Text style={styles.permissionsDescription}>
              {item.description}
            </Text>
          )}
        </View>

        <View style={styles.permissionsContainer}>
          {item.permissions?.map((permission, index) => (
            <View key={index} style={styles.permissionCard}>
              <View style={styles.permissionLeft}>
                <View style={styles.permissionIconContainer}>
                  <Icon name={permission.icon} size={24} color="#1e934d" />
                </View>
                <View style={styles.permissionContent}>
                  <Text style={styles.permissionTitle}>{permission.title}</Text>
                  <Text style={styles.permissionDescription}>
                    {permission.description}
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={styles.permissionButton}>
                <Text style={styles.permissionButtonText}>
                  {permission.action}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  slide: {
    width,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  imageContainer: {
    height: height * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  heroImagePlaceholder: {
    width: width * 0.8,
    height: height * 0.35,
    backgroundColor: '#E5F3EC',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 18,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 26,
  },
  description: {
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 16,
  },

  // Features Slides
  featuresHeader: {
    marginBottom: 32,
    paddingTop: 20,
  },
  featuresSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
  },
  featuresContainer: {
    flex: 1,
  },
  featureCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  featureIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E5F3EC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 6,
  },
  featureDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },

  // Permissions Slide
  permissionsHeader: {
    marginBottom: 32,
    paddingTop: 20,
  },
  permissionsDescription: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 12,
    paddingHorizontal: 8,
  },
  permissionsContainer: {
    flex: 1,
  },
  permissionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  permissionLeft: {
    flex: 1,
    flexDirection: 'row',
    marginRight: 12,
  },
  permissionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E5F3EC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  permissionContent: {
    flex: 1,
  },
  permissionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  permissionDescription: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
  permissionButton: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  permissionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e934d',
  },

  // Pagination
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },

  // Buttons
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  button: {
    backgroundColor: '#1e934d',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#1e934d',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonLastSlide: {
    backgroundColor: '#1e934d',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  skipButton: {
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  skipText: {
    color: '#6B7280',
    fontSize: 15,
    fontWeight: '500',
  },
});