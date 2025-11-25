import React from 'react';
import {BottomTabNavigator} from './BottomTabNavigator';

/**
 * Main app navigator - contains the bottom tab navigator
 * Can be extended to include modals, overlays, etc.
 */
export const MainNavigator = () => {
  return <BottomTabNavigator />;
};

export default MainNavigator;
