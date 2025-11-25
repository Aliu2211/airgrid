# AirGrid Source Code Structure

This document explains the folder structure and organization of the AirGrid mobile application.

## 📁 Directory Structure

```
src/
├── api/                    # API layer
├── assets/                 # Static assets
├── components/             # Reusable UI components
├── config/                 # App configuration
├── contexts/               # React Context providers
├── features/               # Feature modules (domain-driven)
├── hooks/                  # Custom React hooks
├── navigation/             # Navigation configuration
├── screens/                # Screen components
├── services/               # Business logic services
├── state/                  # State management
├── types/                  # TypeScript definitions
├── utils/                  # Utility functions
└── theme/                  # Theme/styling system
```

## 📖 Detailed Guide

### `/api` - API Layer
Contains all API-related code organized by endpoints.

**Structure:**
- `client.ts` - Axios client configuration
- `interceptors.ts` - Request/response interceptors
- `endpoints/` - API endpoint modules
  - `auth.ts` - Authentication endpoints
  - `fleet.ts` - Fleet management
  - `missions.ts` - Mission planning
  - `analytics.ts` - Analytics & reporting
  - `weather.ts` - Weather data
  - `marketplace.ts` - Marketplace (Phase 4)

**Usage:**
```typescript
import {authAPI} from '@/api/endpoints/auth';

const response = await authAPI.login(credentials);
```

---

### `/assets` - Static Assets
Stores all static assets like fonts, images, animations.

**Structure:**
- `fonts/` - Custom fonts (Poppins, Lexend)
- `images/` - Image assets
  - `icons/` - App icons
  - `logos/` - Brand logos
  - `illustrations/` - UI illustrations
- `animations/` - Lottie animations
- `sounds/` - Audio files

---

### `/components` - Reusable UI Components
Organized by category for better maintainability.

**Structure:**
- `common/` - Generic reusable components
  - `Button/`, `Input/`, `Card/`, `Modal/`, etc.
- `layout/` - Layout components
  - `Header/`, `Footer/`, `Container/`
- `drone/` - Drone-specific components
  - `DroneCard/`, `DroneStatus/`, `BatteryIndicator/`
- `mission/` - Mission-specific components
  - `MissionCard/`, `MissionTimeline/`, `WaypointMarker/`
- `map/` - Map components
  - `MapView/`, `NoFlyZone/`, `WeatherOverlay/`
- `analytics/` - Analytics components
  - `Chart/`, `StatCard/`, `DataTable/`

**Component Structure:**
```
Button/
├── Button.tsx          # Component logic
├── Button.styles.ts    # Styles
└── Button.test.tsx     # Tests
```

---

### `/config` - App Configuration
Central configuration for the entire application.

**Files:**
- `environment.ts` - Environment variables & feature flags
- `constants.ts` - App-wide constants
- `theme.ts` - Theme configuration (colors, typography, spacing)
- `index.ts` - Central exports

**Usage:**
```typescript
import {API_BASE_URL, DRONE_STATUS} from '@/config';
import {colors, spacing} from '@/config/theme';
```

---

### `/contexts` - React Context Providers
Application-wide state using React Context API.

**Files:**
- `AuthContext.tsx` - Authentication state
- `FleetContext.tsx` - Fleet management state
- `MissionContext.tsx` - Mission planning state
- `ThemeContext.tsx` - Theme/dark mode state
- `NotificationContext.tsx` - Notifications state

---

### `/features` - Feature Modules
Domain-driven design approach. Each feature is self-contained.

**Structure:**
```
features/
├── auth/
│   ├── components/     # Feature-specific components
│   ├── screens/        # Feature screens
│   ├── hooks/          # Feature-specific hooks
│   └── utils/          # Feature utilities
├── fleet/
├── missions/
├── analytics/
├── marketplace/
├── profile/
└── industry-modules/
    ├── agriculture/
    ├── infrastructure/
    ├── construction/
    └── emergency/
```

---

### `/hooks` - Custom React Hooks
Reusable custom hooks for common functionality.

**Examples:**
- `useAuth.ts` - Authentication logic
- `useDrone.ts` - Drone data management
- `useMission.ts` - Mission operations
- `useLocation.ts` - GPS/location handling
- `useWeather.ts` - Weather data fetching
- `useDebounce.ts` - Input debouncing
- `useNetworkStatus.ts` - Network connectivity

**Usage:**
```typescript
import {useAuth} from '@/hooks';

const {login, logout, user, isAuthenticated} = useAuth();
```

---

### `/navigation` - Navigation Configuration
React Navigation setup and configuration.

**Files:**
- `AppNavigator.tsx` - Root navigator
- `AuthNavigator.tsx` - Authentication flow
- `MainNavigator.tsx` - Main app flow
- `BottomTabNavigator.tsx` - Bottom tabs
- `DrawerNavigator.tsx` - Drawer navigation
- `types.ts` - Navigation type definitions
- `linking.ts` - Deep linking configuration

---

### `/screens` - Screen Components
All screen-level components organized by feature.

**Structure:**
```
screens/
├── HomeScreen.tsx
├── ScanScreen.tsx
├── MapScreen.tsx
├── AlertScreen.tsx
├── ProfileScreen.tsx
├── auth/
│   ├── LoginScreen.tsx
│   ├── RegisterScreen.tsx
│   └── OnboardingScreen.tsx
├── fleet/
├── missions/
└── settings/
```

---

### `/services` - Business Logic Services
Contains business logic separated from UI components.

**Files:**
- `authService.ts` - Authentication logic
- `droneService.ts` - Drone management
- `missionService.ts` - Mission planning logic
- `analyticsService.ts` - Analytics tracking
- `weatherService.ts` - Weather data processing
- `storageService.ts` - Local storage operations
- `notificationService.ts` - Push notifications
- `locationService.ts` - GPS/location service
- `aiService.ts` - AI/ML integration (Phase 2)

**Usage:**
```typescript
import {authService} from '@/services/authService';

await authService.login(credentials);
```

---

### `/state` - State Management
Centralized state management (Redux/Zustand).

**Structure:**
```
state/
├── store.ts              # Store configuration
├── slices/               # State slices
│   ├── authSlice.ts
│   ├── fleetSlice.ts
│   ├── missionSlice.ts
│   └── uiSlice.ts
└── selectors/            # Reusable selectors
    ├── authSelectors.ts
    └── fleetSelectors.ts
```

---

### `/types` - TypeScript Type Definitions
Centralized type definitions for type safety.

**Files:**
- `common.types.ts` - Common/shared types
- `api.types.ts` - API request/response types
- `drone.types.ts` - Drone-related types
- `mission.types.ts` - Mission-related types
- `user.types.ts` - User-related types
- `navigation.types.ts` - Navigation types
- `index.ts` - Central exports

**Usage:**
```typescript
import {Drone, Mission, User} from '@/types';
```

---

### `/utils` - Utility Functions
Helper functions used throughout the app.

**Files:**
- `validation.ts` - Form validation
- `formatting.ts` - Date/number formatting
- `calculations.ts` - Flight calculations
- `permissions.ts` - Permission handling
- `logger.ts` - Logging utility
- `error-handler.ts` - Error handling
- `helpers.ts` - General helpers

**Usage:**
```typescript
import {validation, formatters} from '@/utils';

const isValid = validation.email(email);
const formatted = formatters.distance(1500); // "1.5 km"
```

---

### `/theme` - Theme/Styling System
Consistent design system for the entire app.

**Files:**
- `colors.ts` - Color palette
- `typography.ts` - Font styles
- `spacing.ts` - Spacing system
- `shadows.ts` - Shadow styles
- `animations.ts` - Animation configs
- `index.ts` - Central exports

**Usage:**
```typescript
import {colors, spacing, typography} from '@/theme';

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    backgroundColor: colors.primary,
  },
});
```

---

## 🎯 Best Practices

### 1. **Import Aliases**
Use path aliases for cleaner imports:
```typescript
// ❌ Bad
import {Button} from '../../../components/common/Button';

// ✅ Good
import {Button} from '@/components/common/Button';
```

### 2. **Component Structure**
Follow consistent component structure:
```typescript
// Imports
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

// Types
interface Props {
  title: string;
}

// Component
export const MyComponent: React.FC<Props> = ({title}) => {
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
```

### 3. **File Naming**
- Components: PascalCase (`DroneCard.tsx`)
- Utils/Services: camelCase (`authService.ts`)
- Types: `.types.ts` suffix (`drone.types.ts`)
- Hooks: `use` prefix (`useAuth.ts`)

### 4. **Feature Organization**
Keep related code together within features for better maintainability.

### 5. **Type Safety**
Always use TypeScript types for API responses, props, and state.

---

## 🚀 Getting Started

### Adding a New Feature
1. Create feature folder in `/features`
2. Add feature-specific components, screens, hooks
3. Create API endpoints in `/api/endpoints`
4. Define types in `/types`
5. Add navigation routes if needed

### Adding a New Screen
1. Create screen file in `/screens`
2. Add navigation route in appropriate navigator
3. Update navigation types in `/types/navigation.types.ts`

### Adding a New Component
1. Create component folder in appropriate category
2. Include `.tsx`, `.styles.ts`, and `.test.tsx` files
3. Export from parent folder's `index.ts`

---

## 📚 Additional Resources

- [PROJECT_VISION.md](../PROJECT_VISION.md) - Project vision and roadmap
- [React Native Docs](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Last Updated:** 2025-11-24
**Version:** 1.0.0
